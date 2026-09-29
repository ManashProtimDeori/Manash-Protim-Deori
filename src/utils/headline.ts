export function stripTerminalPeriod(value: string) {
  return value.replace(/[.]+(["'”’])?$/, (_match, closingQuote = '') => closingQuote);
}

export function normalizeHeadline(value: string) {
  return stripTerminalPeriod(value.trim());
}
