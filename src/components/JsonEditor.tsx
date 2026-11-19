import { useEffect, useRef } from 'react';
import * as monaco from 'monaco-editor';
import type { Theme } from '../hooks/useTheme';

monaco.editor.defineTheme('tokyo-night', {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: 'string.key.json', foreground: '7aa2f7' },
    { token: 'string.value.json', foreground: '9ece6a' },
    { token: 'number', foreground: 'ff9e64' },
    { token: 'keyword', foreground: 'bb9af7' },
    { token: 'delimiter', foreground: 'a9b1d6' },
  ],
  colors: {
    'editor.background': '#1a1b26',
    'editor.foreground': '#c0caf5',
    'editorLineNumber.foreground': '#565f89',
    'editorLineNumber.activeForeground': '#a9b1d6',
    'editorCursor.foreground': '#c0caf5',
    'editor.selectionBackground': '#33467c',
    'editor.inactiveSelectionBackground': '#292e42',
    'editor.lineHighlightBackground': '#1f2335',
    'editorIndentGuide.background1': '#292e42',
    'editorIndentGuide.activeBackground1': '#414868',
  },
});

interface JsonEditorProps {
  value: string;
  onChange: (value: string) => void;
  theme: Theme;
  readOnly?: boolean;
  placeholder?: string;
}

export function JsonEditor({
  value,
  onChange,
  theme,
  readOnly = false,
}: JsonEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const monacoEditorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {
    if (!editorRef.current) return;

    const editor = monaco.editor.create(editorRef.current, {
      value: value || '',
      language: 'json',
      minimap: { enabled: false },
      automaticLayout: true,
      readOnly: readOnly,
      fontFamily: '"Fira Code", "Courier New", monospace',
      fontSize: 13,
      lineNumbers: 'on',
      lineNumbersMinChars: 3,
      folding: true,
      foldingStrategy: 'indentation',
      showUnused: true,
      formatOnPaste: true,
      formatOnType: true,
      bracketPairColorization: {
        enabled: true,
        independentColorPoolPerBracketType: true,
      },
      scrollBeyondLastLine: false,
      smoothScrolling: true,
      cursorSmoothCaretAnimation: 'on',
      padding: { top: 16, bottom: 16 },
      wordWrap: 'off',
      rulers: [],
      guides: {
        bracketPairs: 'active',
        bracketPairsHorizontal: 'active',
        indentation: true,
      },
      renderWhitespace: 'selection',
      renderControlCharacters: false,
      renderLineHighlight: 'all',
      roundedSelection: false,
      overviewRulerLanes: 0,
      matchBrackets: 'always',
      showDeprecated: true,
      contextmenu: true,
    });

    monacoEditorRef.current = editor;

    const handleChange = () => {
      const content = editor.getValue();
      onChange(content);
    };

    const subscription = editor.onDidChangeModelContent(handleChange);

    return () => {
      subscription.dispose();
      editor.dispose();
    };
  }, []);

  useEffect(() => {
    monaco.editor.setTheme(theme === 'dark' ? 'tokyo-night' : 'vs');
  }, [theme]);

  useEffect(() => {
    if (monacoEditorRef.current && value !== monacoEditorRef.current.getValue()) {
      monacoEditorRef.current.setValue(value);
    }
  }, [value]);

  return <div ref={editorRef} className="w-full h-full bg-white dark:bg-[#1a1b26] rounded-none" />;
}
