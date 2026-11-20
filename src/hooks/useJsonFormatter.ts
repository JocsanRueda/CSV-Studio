import { useState, useCallback } from 'react';
import {
  formatJson,
  minifyJson,
  sortJsonKeys,
  compactJsonLines,
  validateJson,
  type FormatResult,
} from '../lib/json';
import { removePxObjClass } from '../lib/pegaCleaner';

export interface JsonFormatterState {
  input: string;
  output: string;
  isValid: boolean;
  error?: string;
  indent: number;
}

export const useJsonFormatter = (initialInput = '') => {
  const [state, setState] = useState<JsonFormatterState>({
    input: initialInput,
    output: '',
    isValid: false,
    indent: 2,
  });

  const updateInput = useCallback((input: string) => {
    setState((prev) => ({
      ...prev,
      input,
    }));
  }, []);

  const loadInput = useCallback((input: string) => {
    setState((previous) => ({
      ...previous,
      input,
      output: '',
      isValid: false,
      error: undefined,
    }));
  }, []);

  const performFormat = useCallback(
    (result: FormatResult) => {
      setState((prev) => ({
        ...prev,
        output: result.json,
        isValid: result.isValid,
        error: result.error,
      }));
    },
    []
  );

  const formatInput = useCallback((input: string) => {
    performFormat(formatJson(input, state.indent));
  }, [state.indent, performFormat]);

  const pasteFromClipboard = useCallback(async (onPaste: (text: string) => void) => {
    let text: string;
    try {
      text = await navigator.clipboard.readText();
    } catch {
      setState((prev) => ({
        ...prev,
        error: 'No se pudo acceder al portapapeles. Comprueba los permisos del navegador.',
      }));
      return false;
    }
    onPaste(text);
    formatInput(text);
    return true;
  }, [formatInput]);

  const format = useCallback(() => {
    const result = formatJson(state.input, state.indent);
    performFormat(result);
  }, [state.input, state.indent, performFormat]);

  const minify = useCallback(() => {
    const result = minifyJson(state.input);
    performFormat(result);
  }, [state.input, performFormat]);

  const sortKeys = useCallback(() => {
    const result = sortJsonKeys(state.input, state.indent);
    performFormat(result);
  }, [state.input, state.indent, performFormat]);

  const parseJsonLines = useCallback(() => {
    const result = compactJsonLines(state.input);
    performFormat(result);
  }, [state.input, performFormat]);

  const validate = useCallback(() => {
    const validation = validateJson(state.input);
    setState((prev) => ({
      ...prev,
      isValid: validation.isValid,
      error: validation.error,
    }));
  }, [state.input]);

  const clearAll = useCallback(() => {
    setState({
      input: '',
      output: '',
      isValid: false,
      indent: 2,
    });
  }, []);

  const copyToClipboard = useCallback(
    async (text: string): Promise<boolean> => {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch {
        return false;
      }
    },
    []
  );

  const downloadJson = useCallback((content: string, filename: string = 'formatted.json') => {
    const element = document.createElement('a');
    element.setAttribute('href', `data:application/json;charset=utf-8,${encodeURIComponent(content)}`);
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }, []);

  const setIndent = useCallback((indent: number) => {
    setState((prev) => ({
      ...prev,
      indent: Math.max(1, Math.min(indent, 8)),
    }));
  }, []);

  const swapInputOutput = useCallback(() => {
    setState((prev) => ({
      ...prev,
      input: prev.output,
      output: prev.input,
    }));
  }, []);

  const cleanPega = useCallback(() => {
    try {
      const cleaned = removePxObjClass(state.input, state.indent);
      performFormat({ json: cleaned, isValid: true });
    } catch (error) {
      performFormat({
        json: '',
        isValid: false,
        error: error instanceof Error ? error.message : 'Error al limpiar Pega',
      });
    }
  }, [state.input, state.indent, performFormat]);

  return {
    state,
    updateInput,
    loadInput,
    pasteFromClipboard,
    formatInput,
    format,
    minify,
    sortKeys,
    parseJsonLines,
    validate,
    clearAll,
    copyToClipboard,
    downloadJson,
    setIndent,
    swapInputOutput,
    cleanPega,
  };
};
