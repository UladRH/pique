export const increment = <T extends Record<string, number>>(field: keyof T, counterState: T) => ({
  ...counterState,
  [field]: counterState[field] + 1,
});

export const decrement = <T extends Record<string, number>>(field: keyof T, counterState: T) => ({
  ...counterState,
  [field]: counterState[field] - 1,
});
