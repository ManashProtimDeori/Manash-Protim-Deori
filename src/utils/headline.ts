export function normalizeHeadline(value: string) {
  return value.trim().replace(/[.]+$/, '');
}
