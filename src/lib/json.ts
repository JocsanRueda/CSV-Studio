export interface FormatResult {
  json: string;
  isValid: boolean;
  error?: string;
}

export interface ValidateResult {
  isValid: boolean;
  error?: string;
}

const parseJson = (raw: string): unknown => {
  if (!raw || !raw.trim()) {
    throw new Error('El JSON no puede estar vacío');
  }
  return JSON.parse(raw);
};

export const validateJson = (raw: string): ValidateResult => {
  try {
    parseJson(raw);
    return { isValid: true };
  } catch (error) {
    return {
      isValid: false,
      error: error instanceof Error ? error.message : 'Error al validar JSON',
    };
  }
};

export const formatJson = (raw: string, indent: number = 2): FormatResult => {
  try {
    const parsed = parseJson(raw);
    const formatted = JSON.stringify(parsed, null, indent);
    return { json: formatted, isValid: true };
  } catch (error) {
    return {
      json: raw,
      isValid: false,
      error: error instanceof Error ? error.message : 'Error al formatear JSON',
    };
  }
};

export const minifyJson = (raw: string): FormatResult => {
  try {
    const parsed = parseJson(raw);
    const minified = JSON.stringify(parsed);
    return { json: minified, isValid: true };
  } catch (error) {
    return {
      json: raw,
      isValid: false,
      error: error instanceof Error ? error.message : 'Error al minificar JSON',
    };
  }
};

export const sortJsonKeys = (raw: string, indent: number = 2): FormatResult => {
  try {
    const parsed = parseJson(raw);
    const sorted = sortKeysRecursive(parsed);
    const formatted = JSON.stringify(sorted, null, indent);
    return { json: formatted, isValid: true };
  } catch (error) {
    return {
      json: raw,
      isValid: false,
      error: error instanceof Error ? error.message : 'Error al ordenar JSON',
    };
  }
};

const sortKeysRecursive = (obj: unknown): unknown => {
  if (Array.isArray(obj)) {
    return obj.map(sortKeysRecursive);
  }
  if (obj !== null && typeof obj === 'object') {
    const sorted: Record<string, unknown> = {};
    Object.keys(obj)
      .sort()
      .forEach((key) => {
        sorted[key] = sortKeysRecursive((obj as Record<string, unknown>)[key]);
      });
    return sorted;
  }
  return obj;
};

export const escapeJson = (raw: string, indent: number = 2): FormatResult => {
  try {
    // Parse and re-stringify to ensure it's valid JSON
    const parsed = parseJson(raw);
    const formatted = JSON.stringify(parsed, null, indent);
    return { json: formatted, isValid: true };
  } catch (error) {
    return {
      json: raw,
      isValid: false,
      error: error instanceof Error ? error.message : 'Error al escapar JSON',
    };
  }
};

export const compactJsonLines = (raw: string): FormatResult => {
  try {
    // Convert JSONL (JSON Lines) to single JSON array or parse individual lines
    const lines = raw.trim().split('\n').filter((line) => line.trim());
    const parsed = lines.map((line) => JSON.parse(line));
    const formatted = JSON.stringify(parsed, null, 2);
    return { json: formatted, isValid: true };
  } catch (error) {
    return {
      json: raw,
      isValid: false,
      error:
        error instanceof Error ? error.message : 'Error al procesar JSON Lines',
    };
  }
};
