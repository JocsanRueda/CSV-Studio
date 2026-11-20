import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'pega-tools-json-documents';

export interface JsonDocument {
  id: string;
  name: string;
  content: string;
  pinned?: boolean;
}

interface StoredWorkspace {
  documents: JsonDocument[];
  activeDocumentId: string;
}

interface Workspace extends StoredWorkspace {
  storageError?: string;
}

function createDocument(name = 'documento.json'): JsonDocument {
  return {
    id: crypto.randomUUID(),
    name,
    content: '',
  };
}

function isJsonDocument(value: unknown): value is JsonDocument {
  if (!value || typeof value !== 'object') return false;
  const document = value as Record<string, unknown>;
  return typeof document.id === 'string'
    && typeof document.name === 'string'
    && typeof document.content === 'string'
    && (document.pinned === undefined || typeof document.pinned === 'boolean');
}

function readWorkspace(): Workspace {
  const initialDocument = createDocument();
  const initialWorkspace = {
    documents: [initialDocument],
    activeDocumentId: initialDocument.id,
  };

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return initialWorkspace;

    const parsed: unknown = JSON.parse(stored);
    if (!parsed || typeof parsed !== 'object') {
      throw new Error('El almacenamiento no tiene el formato esperado.');
    }

    const workspace = parsed as Record<string, unknown>;
    if (
      !Array.isArray(workspace.documents)
      || workspace.documents.length === 0
      || !workspace.documents.every(isJsonDocument)
      || typeof workspace.activeDocumentId !== 'string'
    ) {
      throw new Error('El almacenamiento no tiene el formato esperado.');
    }

    const documents = workspace.documents;
    const activeDocumentId = documents.some((document) => document.id === workspace.activeDocumentId)
      ? workspace.activeDocumentId
      : documents[0].id;

    return { documents, activeDocumentId };
  } catch {
    return {
      ...initialWorkspace,
      storageError: 'No se pudieron cargar los borradores guardados. Se inició un documento nuevo.',
    };
  }
}

export function useJsonDocuments() {
  const [workspace, setWorkspace] = useState<Workspace>(readWorkspace);
  const { documents, activeDocumentId } = workspace;
  const activeDocument = documents.find((document) => document.id === activeDocumentId) ?? documents[0];

  useEffect(() => {
    const persist = () => {
      try {
        const storedWorkspace: StoredWorkspace = { documents, activeDocumentId };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(storedWorkspace));
        setWorkspace((previous) => previous.storageError
          ? { ...previous, storageError: undefined }
          : previous);
      } catch {
        setWorkspace((previous) => ({
          ...previous,
          storageError: 'No se pudieron guardar los borradores en este navegador.',
        }));
      }
    };

    const timeout = window.setTimeout(persist, 300);
    window.addEventListener('pagehide', persist);
    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener('pagehide', persist);
    };
  }, [documents, activeDocumentId]);

  const createNewDocument = useCallback(() => {
    let number = 1;
    let name = 'nuevo.json';
    while (documents.some((document) => document.name === name)) {
      number += 1;
      name = `nuevo (${number}).json`;
    }

    const document = createDocument(name);
    setWorkspace((previous) => ({
      ...previous,
      documents: [...previous.documents, document],
      activeDocumentId: document.id,
    }));
    return document;
  }, [documents]);

  const selectDocument = useCallback((id: string) => {
    setWorkspace((previous) => previous.documents.some((document) => document.id === id)
      ? { ...previous, activeDocumentId: id }
      : previous);
  }, []);

  const updateDocument = useCallback((id: string, content: string) => {
    setWorkspace((previous) => {
      const document = previous.documents.find((item) => item.id === id);
      if (!document || document.content === content) return previous;
      return {
        ...previous,
        documents: previous.documents.map((item) => item.id === id ? { ...item, content } : item),
      };
    });
  }, []);

  const renameDocument = useCallback((id: string, name: string) => {
    const trimmedName = name.trim();
    if (!trimmedName) return;
    setWorkspace((previous) => ({
      ...previous,
      documents: previous.documents.map((document) => document.id === id
        ? { ...document, name: trimmedName }
        : document),
    }));
  }, []);

  const togglePinned = useCallback((id: string) => {
    setWorkspace((previous) => ({
      ...previous,
      documents: previous.documents.map((document) => document.id === id
        ? { ...document, pinned: !document.pinned }
        : document),
    }));
  }, []);

  const deleteDocument = useCallback((id: string) => {
    const remaining = documents.filter((document) => document.id !== id);
    if (remaining.length === documents.length) return activeDocument;

    const nextActiveDocument = remaining.length === 0
      ? createDocument()
      : activeDocumentId === id
        ? remaining[0]
        : activeDocument;
    const nextDocuments = remaining.length === 0 ? [nextActiveDocument] : remaining;

    setWorkspace((previous) => ({
      ...previous,
      documents: nextDocuments,
      activeDocumentId: activeDocumentId === id ? nextActiveDocument.id : previous.activeDocumentId,
    }));
    return nextActiveDocument;
  }, [activeDocument, activeDocumentId, documents]);

  return {
    documents,
    activeDocument,
    storageError: workspace.storageError,
    createNewDocument,
    selectDocument,
    updateDocument,
    renameDocument,
    togglePinned,
    deleteDocument,
  };
}
