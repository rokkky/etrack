import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  setItems(data: { [key: string]: string }) {
    Object.keys(data).forEach((key) => {
      localStorage.setItem(key, data[key]);
    });
  }

  getItem(key: string): string {
    return localStorage.getItem(key) || '';
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clearStorage(): void {
    localStorage.clear();
  }
}
