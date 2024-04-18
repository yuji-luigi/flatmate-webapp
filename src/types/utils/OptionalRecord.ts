export type OptionalRecord<K extends keyof any, T> = {
  [P in K]?: T;
};
