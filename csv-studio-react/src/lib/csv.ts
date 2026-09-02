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

const parseFile = (file: File) =>
  new Promise<ParseResult<string[]>>((resolve, reject) => {
    Papa.parse<string[]>(file, {
      skipEmptyLines: false,
      complete: (result) => {
        const quoteError = result.errors.find((error) => error.type === 'Quotes');
        if (quoteError) {
          reject(new Error(quoteError.message));
          return;
        }
        resolve(result);
      },
      error: reject,
    });
  });

const normalizeHeader = (value: unknown): string =>
  String(value ?? '')
    .replace(/^\uFEFF/, '')
    .normalize('NFKC')
    .trim()
    .toLocaleLowerCase('en-US');

const newlineOf = (text: string): string =>
  text.includes('\r\n') ? '\r\n' : text.includes('\r') ? '\r' : '\n';

export const cleanOutputName = (name: string): string => {
  const base = name.replace(/\.csv$/i, '');
  const cleaned = base
    .replace(/[ _-]*\d{8}T\d{6}(?:\.\d+)?\s*GMT\s*$/i, '')
    .replace(/[ _-]+$/, '');
  return `${cleaned || base}.csv`;
};

export async function cleanCsv(
  file: File,
  { removeOptionalColumns = {} }: CleanOptions = {},
): Promise<CleanResult> {
  const raw = await file.text();
  const parsed = await parseFile(file);
  const rows = parsed.data;

  if (!rows.length || !Array.isArray(rows[0])) {
    throw new Error(TEXTS.invalidCsv);
  }

  const prefix = normalizeHeader(SETTINGS.systemPrefix);
  const optionalSet = new Set(
    SETTINGS.optionalExactColumns
      .filter((column) => removeOptionalColumns[column] !== false)
      .map(normalizeHeader),
  );

  const keep = rows[0]
    .map((header, index) => ({ header: String(header ?? '').replace(/^\uFEFF/, ''), index }))
    .filter(({ header }) => {
      const normalized = normalizeHeader(header);
      return !normalized.startsWith(prefix) && !optionalSet.has(normalized);
    });

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
