export function normalizeHeadline(value: string) {
  return value.trim().replace(/[.]+(["'”’])?$/, (_match, closingQuote = '') => closingQuote);
}
