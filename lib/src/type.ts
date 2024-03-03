export type KeyOf<T extends readonly string[]> = T[number];

export type CombineIfNotNever<A, B, C> = [A] extends [never]
  ? [B] extends [never]
    ? [C] extends [never]
      ? never
      : C
    : [C] extends [never]
    ? B
    : B & C
  : [B] extends [never]
  ? [C] extends [never]
    ? A
    : A & C
  : [C] extends [never]
  ? A & B
  : A & B & C;
