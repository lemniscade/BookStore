import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class VariableService {
  apiUrl: string;
  constructor(private http: HttpClient) { }
  getApiUrl() {
    return "https://localhost:7238/api"
  }
  private jsonUrl = 'assets/data.json'; // JSON dosyasının yolu

  getData(): Observable<any[]> {
    return this.http.get<any>(this.jsonUrl).pipe(
      map(response => {
        // Eğer response bir array değilse, array'e çevirelim
        if (!Array.isArray(response)) {
          if (typeof response === 'object' && response !== null) {
            return Object.values(response);
          } else {
            console.error('Unexpected data format:', response);
            return [];
          }
        }
        return response;
      })
    );
  }
}
