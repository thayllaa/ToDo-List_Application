const toCamel = (s: string) => s.replace(/_([a-z0-9])/g, (_, c: string) => c.toUpperCase());

/** Converte chaves snake_case (padrão do Lucid) para camelCase, recursivamente. */
export function camelize<T = any>(value: any): T {
  if (Array.isArray(value)) return value.map((v) => camelize(v)) as any;
  if (value && typeof value === 'object' && !(value instanceof Date)) {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [toCamel(k), camelize(v)]),
    ) as any;
  }
  return value;
}
