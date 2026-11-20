interface ShortcutHintProps {
  shortcut: string;
  visible: boolean;
}

export function ShortcutHint({ shortcut, visible }: ShortcutHintProps) {
  if (!visible) return null;

  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute -right-1 -top-2 z-10 rounded border border-amber-400 bg-amber-100 px-1 text-[10px] font-bold leading-4 text-amber-950 dark:bg-amber-300"
    >
      {shortcut}
    </span>
  );
}
