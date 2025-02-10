import { Transform } from 'class-transformer';

export function TransformToStringArray() {
  return Transform(({ value }) => {
    if (!value) return [];
    if (Array.isArray(value)) return value.map((v) => v.trim());
    if (typeof value === 'string') {
      return value.split(',').map((relation) => relation.trim());
    }
    return [];
  });
}
