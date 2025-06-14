// src/app/services/test.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Test } from '../models/test.model';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private readonly apiUrl = 'http://localhost:8080/api/tests';

  constructor(private http: HttpClient) {}

  getAllTests(): Observable<Test[]> {
    return this.http.get<Test[]>(this.apiUrl);
  }

  // Optional methods you may implement later:
  // getTestById(id: number): Observable<Test> { ... }
  // addTest(test: Test): Observable<Test> { ... }
  // updateTest(id: number, test: Test): Observable<Test> { ... }
  // deleteTest(id: number): Observable<void> { ... }
}
