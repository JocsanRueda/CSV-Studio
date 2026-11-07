import Papa, { type ParseResult } from 'papaparse';
import { SETTINGS, TEXTS } from '../config';

export interface CleanOptions {
  removeOptionalColumns?: Record<string, boolean>;
  duplicateColumns?: readonly number[];
}

export interface CleanResult {
  csv: string;
  removed: number;
  duplicatesRemoved: number;
  name: string;
}

// Papa.parse is synchronous for string input, so no need to read the file twice via a File-based parse.
function parseCsvText(raw: string): ParseResult<string[]> {
  if (!raw) throw new Error(TEXTS.invalidCsv);
  const parsed = Papa.parse<string[]>(raw, { skipEmptyLines: false });
  const quoteError = parsed.errors.find((error) => error.type === 'Quotes');
  if (quoteError) {
    throw new Error(quoteError.message);
  }
  return parsed;
}

export async function readCsvHeaders(file: File): Promise<string[]> {
  const parsed = parseCsvText(await file.text());
  return parsed.data[0].map((header) => header.replace(/^\uFEFF/, ''));
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
  { removeOptionalColumns = {}, duplicateColumns = [] }: CleanOptions = {},
): Promise<CleanResult> {
  const raw = await file.text();
  const parsed = parseCsvText(raw);
  const rows = parsed.data;

  if (!rows.length || !Array.isArray(rows[0])) {
    throw new Error(TEXTS.invalidCsv);
  }

  const keep = resolveColumnsToKeep(rows[0], removeOptionalColumns);
  const removed = rows[0].length - keep.length;

  if (duplicateColumns.some((index) => !Number.isInteger(index) || index < 0 || index >= rows[0].length)) {
    throw new Error(TEXTS.invalidDuplicateColumns);
  }

  const seen = new Set<string>();
  let duplicatesRemoved = 0;
  const cleanedRows = [keep.map(({ header }) => header)];
  for (let rowIndex = 1; rowIndex < rows.length; rowIndex += 1) {
    const row = rows[rowIndex];
    // Papa represents a final line ending as an extra empty row; preserve it.
    const isTrailingNewline = rowIndex === rows.length - 1 && row.length === 1 && row[0] === '' && /[\r\n]$/.test(raw);
    if (duplicateColumns.length > 0 && isTrailingNewline) {
      cleanedRows.push(['']);
      continue;
    }
    if (duplicateColumns.length > 0 && !isTrailingNewline) {
      const key = JSON.stringify(duplicateColumns.map((index) => row[index] ?? ''));
      if (seen.has(key)) {
        duplicatesRemoved += 1;
        continue;
      }
      seen.add(key);
    }
    cleanedRows.push(keep.map(({ index }) => row[index] ?? ''));
  }

  const csv = Papa.unparse(cleanedRows, {
    delimiter: parsed.meta.delimiter || ',',
    newline: newlineOf(raw),
    quotes: false,
  });

  return { csv, removed, duplicatesRemoved, name: cleanOutputName(file.name) };
}
