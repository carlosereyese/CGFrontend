import { Injectable } from '@angular/core';

const TOKEN_KEY = 'token_key';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  saveToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  removeToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  }
}