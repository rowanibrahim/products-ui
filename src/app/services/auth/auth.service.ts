import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

export interface UserAuthPayload {
  username: string;
  password: string;
}
export interface UserAuthResponse {
  token: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl:string = "http://localhost:8080";
  httpOptions:any = {};
  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {  
      this.log(`${operation} failed: ${error.message}`);
        return of(result as T);
    };
  }
  private log(message: string) {
    console.log(`AuthMessage: ${message}`);
  }
  login(payload:UserAuthPayload): Observable<UserAuthResponse> {
    var url = this.baseUrl + "/login"
    return this.http.post<UserAuthResponse>(url, payload)
      .pipe(
        catchError(this.handleError<UserAuthResponse>('Authentication'))
      );
  }
}
