type PartialObject<T, S> = { [Property in keyof T]: S };
export function getPropertyName<T, S = string>(
  obj: T,
  expression: (x: PartialObject<T, S>) => S
): S {
  const res: PartialObject<T, S> = {} as PartialObject<T, S>;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  Object.keys(obj).map((k) => (res[k as keyof T] = k));

  return expression(res);
}
