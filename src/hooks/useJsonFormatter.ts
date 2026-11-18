import { useState, useCallback } from 'react';
import {
  formatJson,
  minifyJson,
  sortJsonKeys,
  compactJsonLines,
  validateJson,
  type FormatResult,
} from '../lib/json';

export interface JsonFormatterState {
  input: string;
  output: string;
  isValid: boolean;
  error?: string;
  indent: number;
  history: string[];
  historyIndex: number;
}

export const useJsonFormatter = () => {
  const [state, setState] = useState<JsonFormatterState>({
    input: '',
    output: '',
    isValid: false,
    indent: 2,
    history: [],
    historyIndex: -1,
  });

  const updateInput = useCallback((input: string) => {
    setState((prev) => ({
      ...prev,
      input,
      history: [input],
      historyIndex: 0,
    }));
  }, []);

  const pasteFromClipboard = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      updateInput(text);
      return true;
    } catch {
      return false;
    }
  }, [updateInput]);

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
      history: [],
      historyIndex: -1,
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

  return {
    state,
    updateInput,
    pasteFromClipboard,
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
  };
};
