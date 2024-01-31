import { Injectable, OnInit } from '@angular/core';
import { LoginRequest } from './loginRequest';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/enviroment';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<String> = new BehaviorSubject<String>("");
  currentUsername: BehaviorSubject<String> = new BehaviorSubject<String>("");

  constructor(private http: HttpClient) {
    this.currentUserLoginOn = new BehaviorSubject<boolean>(sessionStorage.getItem("token") != null);
    this.currentUserData = new BehaviorSubject<String>(sessionStorage.getItem("token") || "");
    if (sessionStorage.getItem("token")) {
        const decodedToken: any = jwtDecode(sessionStorage.getItem("token") || "");
        this.currentUsername = new BehaviorSubject<String>(decodedToken.sub);
        console.log(decodedToken.sub+" ..  constructor");
    }

  }

  login(credentials: LoginRequest): Observable<any> {
    return this.http.post<any>(environment.urlHost + "auth/login", credentials).pipe(
      tap((userData) => {
        sessionStorage.setItem("token", userData.token)
        this.currentUserData.next(userData.token);
        this.currentUserLoginOn.next(true);
        const decodedToken: any = jwtDecode(sessionStorage.getItem("token") || "");
        this.currentUsername.next(decodedToken.sub);
        console.log(decodedToken.sub+" ..  login");
      }),
      map((userData) => userData.token),
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Se ha producio un error ', error.error);
    }
    else {
      console.error('Backend retornó el código de estado ', error);
    }
    return throwError(() => new Error('Algo falló. Por favor intente nuevamente.'));
  }

  logout(): void {
    sessionStorage.removeItem("token");
    this.currentUserLoginOn.next(false);
  }

  get userData(): Observable<String> {
    return this.currentUserData.asObservable();
  }

  get userLoginOn(): Observable<boolean> {
    return this.currentUserLoginOn.asObservable();
  }

  get username(): Observable<String> {
    return this.currentUsername.asObservable();
  }

  get userToken(): String {
    return this.currentUserData.value;
  }
}
