import { Injectable } from '@angular/core';
import { VariableService } from './variable.service';
import { HttpClient } from '@angular/common/http';
import { RegisterUser } from '../models/RegisterUserModel';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  apiUrl = this.variableService.getApiUrl();
  pageUrl: string;
  constructor(private variableService: VariableService, private http: HttpClient) { }
  public registerUser(data: RegisterUser): Observable<any> {
    this.pageUrl = this.apiUrl + '/register';
    return this.http.post<any>(`${this.pageUrl}`, data);
  }
}
