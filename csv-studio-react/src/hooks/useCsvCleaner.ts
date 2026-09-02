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

const defaultOptionalColumns = (): OptionalColumns =>
  Object.fromEntries(SETTINGS.optionalExactColumns.map((column) => [column, true]));

export function useCsvCleaner() {
  const [files, setFiles] = useState<File[]>([]);
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [result, setResult] = useState<CleanOutput | null>(null);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [optionalColumns, setOptionalColumns] = useState<OptionalColumns>(defaultOptionalColumns);

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
        setProgress((current) => ({ ...current, [key]: 10 }));
        try {
          const cleaned = await cleanCsv(file, { removeOptionalColumns: optionalColumns });
          setProgress((current) => ({ ...current, [key]: 80 }));
          zip.file(cleaned.name, cleaned.csv);
          ok += 1;
          removed += cleaned.removed;
          await new Promise((resolve) => setTimeout(resolve, 120));
          setProgress((current) => ({ ...current, [key]: 100 }));
        } catch (error) {
          errors.push(`${file.name}: ${(error as Error).message}`);
          setProgress((current) => ({ ...current, [key]: 100 }));
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
  }, [files, optionalColumns]);

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
