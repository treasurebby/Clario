export interface IStorageService {
  save<T>(key: string, data: T): void;
  load<T>(key: string): T | null;
  clear(key: string): void;
  clearAll(): void;
}

export class LocalStorageService implements IStorageService {
  save<T>(key: string, data: T): void {
    try {
      const serialized = JSON.stringify(data);
      localStorage.setItem(key, serialized);
    } catch (error) {
      console.error(`Error saving to localStorage: ${error}`);
    }
  }

  load<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      if (!item) return null;
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Error loading from localStorage: ${error}`);
      return null;
    }
  }

  clear(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error clearing localStorage: ${error}`);
    }
  }

  clearAll(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error(`Error clearing all localStorage: ${error}`);
    }
  }
}
