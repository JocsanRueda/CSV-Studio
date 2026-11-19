export function removePxObjClass(jsonString: string, indent = 2): string {
  const parsed: unknown = JSON.parse(jsonString, (key, value: unknown) =>
    key === 'pxObjClass' ? undefined : value
  );
  return JSON.stringify(parsed, null, indent);
}
