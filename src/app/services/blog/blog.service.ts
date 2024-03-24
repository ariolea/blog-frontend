import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/enviroment';
import { BlogRequest } from './blogRequest';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }


  getBlogs(): Observable<any> {
    return this.http.get<any>(environment.urlApi + "blog").pipe(
      catchError(this.handleError)
    )
  }

  postBlogs(blogRequest: BlogRequest): Observable<BlogRequest> {
    return this.http.post<BlogRequest>(environment.urlApi + "blog", blogRequest).pipe(
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
