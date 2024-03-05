import { Injectable } from '@angular/core';
import { LocalStorageKeys } from '@aw/core/types/_index';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  set(key: LocalStorageKeys, value: string): void {
    localStorage.setItem(key, value);
  }

  get(key: LocalStorageKeys): string {
    return localStorage.getItem(key) as string;
  }

  setObject<T>(key: LocalStorageKeys, obj: T): string {
    const value = JSON.stringify(obj);
    this.set(key, value);

    return value;
  }

  getParse<T>(key: LocalStorageKeys): T {
    const value = this.get(key);
    const valueParse = JSON.parse(value) as T;

    return valueParse;
  }

  remove(key: LocalStorageKeys): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
