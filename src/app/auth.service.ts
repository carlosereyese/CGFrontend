import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) {}

  login(credentials: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/authenticate`, credentials);
  }

  logout(): void {
    this.tokenStorageService.removeToken();
  }
}
