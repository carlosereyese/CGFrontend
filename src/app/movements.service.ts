import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movements } from './domain/movements';

@Injectable({
  providedIn: 'root'
})
export class MovementsService {

  private apiUrl = `${environment.apiUrl}/movements`;

  constructor(private http: HttpClient) {}

  getAllMovements(): Observable<Movements[]> {
    const url = `${this.apiUrl}/getAllMovements`;
    return this.http.get<Movements[]>(url);
  }
}
