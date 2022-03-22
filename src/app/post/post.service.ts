import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Post } from './post';
import { bucketArrays } from './bucketArrays';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiURL = 'http://onboardme-beta.celcom.com.my/api';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Post[]> {
    return this.httpClient
      .get<Post[]>(this.apiURL + '/bucket-lists/')
      .pipe(catchError(this.errorHandler));
  }

  getMyBucketlist(): Observable<bucketArrays[]> {
    return this.httpClient
      .get<bucketArrays[]>(
        this.apiURL + '/bucket-lists/asreena.zailan@celcom.com.my'
      )
      .pipe(catchError(this.errorHandler));
  }

  create(email: any, bucketItems: any): Observable<Post> {
    console.log(bucketItems);
    return this.httpClient
      .post<Post>(
        this.apiURL + '/bucket-lists/',
        { email, bucketItems },
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  find(email: string): Observable<Post> {
    return this.httpClient
      .get<Post>(this.apiURL + '/bucket-lists/' + email)
      .pipe(catchError(this.errorHandler));
  }

  update(bucketItems: any): Observable<Post> {
    return this.httpClient
      .put<Post>(
        this.apiURL + '/bucket-lists/asreena.zailan@celcom.com.my',
        { bucketItems },
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  delete(email: any): Observable<Post> {
    return this.httpClient
      .delete<Post>(
        this.apiURL + '/bucket-lists/asreena.zailan@celcom.com.my',
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: {
    error: { message: string };
    status: any;
    message: any;
  }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
