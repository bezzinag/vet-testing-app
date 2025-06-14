import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Test } from '../models/test.model';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private readonly apiUrl = 'http://localhost:8080/api/pettests';

  constructor(private http: HttpClient) {}

  getAllTests(): Observable<Test[]> {
    return this.http.get<Test[]>(this.apiUrl);
  }

  // Future implementations:
  // getTestById(id: number): Observable<Test> {
  //   return this.http.get<Test>(`${this.apiUrl}/${id}`);
  // }

  // addTest(test: Test): Observable<Test> {
  //   return this.http.post<Test>(this.apiUrl, test);
  // }

  // updateTest(id: number, test: Test): Observable<Test> {
  //   return this.http.put<Test>(`${this.apiUrl}/${id}`, test);
  // }

  // deleteTest(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/${id}`);
  // }
}
