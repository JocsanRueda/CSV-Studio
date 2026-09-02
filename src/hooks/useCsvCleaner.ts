import { useCallback, useState } from 'react';
import JSZip from 'jszip';
import { SETTINGS, TEXTS } from '../config';
import { cleanCsv } from '../lib/csv';
import { downloadBlob, fileKey, mergeUniqueCsv } from '../lib/files';

export type OptionalColumns = Record<string, boolean>;

interface SingleResult {
  kind: 'single';
  blob: Blob;
  name: string;
}

interface ZipResult {
  kind: 'zip';
  zip: JSZip;
}

type CleanOutput = SingleResult | ZipResult;

export interface Summary {
  ok: number;
  removed: number;
  errors: string[];
}

const PROGRESS_STARTED = 10;
const PROGRESS_PARSED = 80;
const PROGRESS_DONE = 100;
// Brief pause so the progress bar animation is visible even on fast/local files.
const FEEDBACK_DELAY_MS = 120;

const defaultOptionalColumns = (): OptionalColumns =>
  Object.fromEntries(SETTINGS.optionalExactColumns.map((column) => [column, true]));

const getErrorMessage = (error: unknown): string => (error instanceof Error ? error.message : String(error));

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function useCsvCleaner() {
  const [files, setFiles] = useState<File[]>([]);
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [result, setResult] = useState<CleanOutput | null>(null);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [optionalColumns, setOptionalColumns] = useState<OptionalColumns>(defaultOptionalColumns);

  const setFileProgress = useCallback((key: string, value: number) => {
    setProgress((current) => ({ ...current, [key]: value }));
  }, []);

  const addFiles = useCallback((incoming: File[]) => {
    setFiles((current) => mergeUniqueCsv(current, incoming));
    setSummary(null);
    setResult(null);
  }, []);

  const removeFile = useCallback((index: number) => {
    setFiles((current) => current.filter((_, i) => i !== index));
  }, []);

  const clear = useCallback(() => {
    setFiles([]);
    setProgress({});
    setResult(null);
    setSummary(null);
  }, []);

  const toggleOptionalColumn = useCallback((name: string) => {
    setOptionalColumns((current) => ({ ...current, [name]: !current[name] }));
  }, []);

  const clean = useCallback(async () => {
    setIsProcessing(true);
    setResult(null);
    setProgress({});

    const zip = new JSZip();
    let ok = 0;
    let removed = 0;
    const errors: string[] = [];

    try {
      for (const file of files) {
        const key = fileKey(file);
        setFileProgress(key, PROGRESS_STARTED);
        try {
          const cleaned = await cleanCsv(file, { removeOptionalColumns: optionalColumns });
          setFileProgress(key, PROGRESS_PARSED);
          zip.file(cleaned.name, cleaned.csv);
          ok += 1;
          removed += cleaned.removed;
          await wait(FEEDBACK_DELAY_MS);
        } catch (error) {
          errors.push(`${file.name}: ${getErrorMessage(error)}`);
        } finally {
          setFileProgress(key, PROGRESS_DONE);
        }
      }

      if (ok === 1) {
        const [item] = Object.values(zip.files);
        const blob = await item.async('blob');
        setResult({ kind: 'single', blob, name: item.name });
      } else if (ok > 1) {
        setResult({ kind: 'zip', zip });
      }

      setSummary({ ok, removed, errors });
    } finally {
      setIsProcessing(false);
    }
  }, [files, optionalColumns, setFileProgress]);

  const download = useCallback(async () => {
    if (!result) return;
    if (result.kind === 'single') {
      downloadBlob(result.blob, result.name);
    } else {
      downloadBlob(await result.zip.generateAsync({ type: 'blob' }), TEXTS.zipName);
    }
  }, [result]);

  return {
    files,
    progress,
    result,
    summary,
    isProcessing,
    optionalColumns,
    addFiles,
    removeFile,
    clear,
    toggleOptionalColumn,
    clean,
    download,
  };
}
