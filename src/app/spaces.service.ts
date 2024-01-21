import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Spaces } from './domain/spaces';

@Injectable({
  providedIn: 'root'
})
export class SpacesService {

  private apiUrl = `${environment.apiUrl}/spaces`;

  constructor(private http: HttpClient) {}

  getAllSpaces(): Observable<Spaces[]> {
    const url = `${this.apiUrl}/getAllSpaces`;
    return this.http.get<Spaces[]>(url);
  }
}
