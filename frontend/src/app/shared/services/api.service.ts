import { HttpClient, HttpErrorResponse, HttpParams, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  private static formatErrors(error: HttpErrorResponse): Observable<never> {
    return throwError(error.error);
  }

  private request<R>(
    method: string,
    path: string,
    options: Record<string, unknown> = {},
  ): Observable<R> {
    return this.http.request<R>(method, path, options).pipe(catchError(ApiService.formatErrors));
  }

  get<R>(path: string, params?: HttpParamsOptions['fromObject']): Observable<R> {
    return this.request('GET', `${API_URL}${path}`, {
      params: new HttpParams({ fromObject: params }),
    });
  }

  post<R>(path: string, body: Record<string, unknown> = {}): Observable<R> {
    return this.request('POST', `${API_URL}${path}`, { body });
  }

  put<R>(path: string, body: Record<string, unknown> = {}): Observable<R> {
    return this.request('PUT', `${API_URL}${path}`, { body });
  }

  delete<R>(path: string): Observable<R> {
    return this.request('DELETE', `${API_URL}${path}`);
  }
}
