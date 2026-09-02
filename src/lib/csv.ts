import Papa, { type ParseResult } from 'papaparse';
import { SETTINGS, TEXTS } from '../config';

export interface CleanOptions {
  removeOptionalColumns?: Record<string, boolean>;
}

export interface CleanResult {
  csv: string;
  removed: number;
  name: string;
}

// Papa.parse is synchronous for string input, so no need to read the file twice via a File-based parse.
function parseCsvText(raw: string): ParseResult<string[]> {
  const parsed = Papa.parse<string[]>(raw, { skipEmptyLines: false });
  const quoteError = parsed.errors.find((error) => error.type === 'Quotes');
  if (quoteError) {
    throw new Error(quoteError.message);
  }
  return parsed;
}

// NFKC + lowercase so headers with different Unicode forms or casing still match (e.g. "pyGUID" vs "PYGUID").
const normalizeHeader = (value: unknown): string =>
  String(value ?? '')
    .replace(/^\uFEFF/, '')
    .normalize('NFKC')
    .trim()
    .toLocaleLowerCase('en-US');

const newlineOf = (text: string): string =>
  text.includes('\r\n') ? '\r\n' : text.includes('\r') ? '\r' : '\n';

// Strips a trailing PEGA export timestamp like "_20260812T215952.873 GMT" from the file name.
export const cleanOutputName = (name: string): string => {
  const base = name.replace(/\.csv$/i, '');
  const cleaned = base
    .replace(/[ _-]*\d{8}T\d{6}(?:\.\d+)?\s*GMT\s*$/i, '')
    .replace(/[ _-]+$/, '');
  return `${cleaned || base}.csv`;
};

interface KeptColumn {
  header: string;
  index: number;
}

function resolveColumnsToKeep(header: string[], removeOptionalColumns: Record<string, boolean>): KeptColumn[] {
  const prefix = normalizeHeader(SETTINGS.systemPrefix);
  const optionalSet = new Set(
    SETTINGS.optionalExactColumns
      .filter((column) => removeOptionalColumns[column] !== false)
      .map(normalizeHeader),
  );

  return header
    .map((rawHeader, index) => ({ header: String(rawHeader ?? '').replace(/^\uFEFF/, ''), index }))
    .filter(({ header: value }) => {
      const normalized = normalizeHeader(value);
      return !normalized.startsWith(prefix) && !optionalSet.has(normalized);
    });
}

export async function cleanCsv(
  file: File,
  { removeOptionalColumns = {} }: CleanOptions = {},
): Promise<CleanResult> {
  const raw = await file.text();
  const parsed = parseCsvText(raw);
  const rows = parsed.data;

  if (!rows.length || !Array.isArray(rows[0])) {
    throw new Error(TEXTS.invalidCsv);
  }

  const keep = resolveColumnsToKeep(rows[0], removeOptionalColumns);
  const removed = rows[0].length - keep.length;

  const cleanedRows = rows.map((row, rowIndex) =>
    keep.map(({ header, index }) => (rowIndex === 0 ? header : (row[index] ?? ''))),
  );

  const csv = Papa.unparse(cleanedRows, {
    delimiter: parsed.meta.delimiter || ',',
    newline: newlineOf(raw),
    quotes: false,
  });

  return { csv, removed, name: cleanOutputName(file.name) };
}

