import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const AUTH_API = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  // Get Task List API

  getTaskList(): Observable<any> {
    return this.http.get<{ token: string }>(AUTH_API + "/getAllTasks" ).pipe(map((result: any) => {
      return result;
    }), catchError(this.errorHandler));
  }

  // Create Task API

  createTask(data :any): Observable<any> {
    return this.http.post(AUTH_API + "/createTask", data).pipe(map((result: any) => {
      return result;
    }), catchError(this.errorHandler));
  }

  

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);

  }

}