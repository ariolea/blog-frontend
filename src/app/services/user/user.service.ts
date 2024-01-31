import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../auth/user';
import { environment } from 'src/environments/enviroment';
import { UserRegister } from '../auth/userRegister';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  registerUser(userRegister: UserRegister): Observable<User> {
    return this.http.post<User>(environment.urlHost + 'auth/register', userRegister).pipe(
      catchError(this.handleError)
    );
  }

  getUser(username: String): Observable<User> {
    return this.http.get<User>(environment.urlApi + "user/username/" + username).pipe(
      catchError(this.handleError)
    )
  }

  updateUser(userRequest: User): Observable<any> {
    return this.http.put(environment.urlApi + "user", userRequest).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Se ha producio un error ', error.error);
    }
    else {
      console.error('Backend retornó el código de estado ', error.status, error.error);
    }
    return throwError(() => new Error('Algo falló. Por favor intente nuevamente.'));
  }
}
