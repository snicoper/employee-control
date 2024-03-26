export interface StateService<T> {
  refresh(): void;
  getValue(): T;
  clean(): void;
}
