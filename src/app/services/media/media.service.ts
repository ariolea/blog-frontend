import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(private http: HttpClient) { }

  uploadFile(formData: FormData): Observable<any> {
    return this.http.post('http://localhost:8080/media/upload', formData).pipe(
      catchError(this.handleError)
    );
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
