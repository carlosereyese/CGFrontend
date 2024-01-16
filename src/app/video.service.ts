import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private apiUrl = `${environment.apiUrl}/video`;

  constructor(private http: HttpClient) { }

  getVideo(title: string) {
    const url = `${this.apiUrl}/getVideo?title=${title}`;
    return this.http.get(url, { responseType: 'arraybuffer' });
  }

  getVideoStream(title: string): Observable<any> {
    const url = `${this.apiUrl}/stream?title=${title}`;
    return this.http.get(url, { responseType: 'arraybuffer' });
  }
}
