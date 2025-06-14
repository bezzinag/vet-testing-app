import { Component, OnInit } from '@angular/core';
import { TestService } from '../../services/test.service';
import { Test } from '../../models/test.model';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-view-tests',
  templateUrl: './view-tests.component.html',
  styleUrls: ['./view-tests.component.scss']
})
export class ViewTestsComponent implements OnInit {
  tests: Test[] = [];
  errorMessage = '';
  userRole: string = '';

  constructor(private testService: TestService) {}

  ngOnInit(): void {
    this.loadTests();
    this.extractUserRole();
  }

  private loadTests(): void {
    this.testService.getAllTests().subscribe({
      next: (tests) => this.tests = tests,
      error: (error) => {
        this.errorMessage = 'Failed to load tests.';
        console.error('Error fetching tests:', error);
      }
    });
  }

  private extractUserRole(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      this.userRole = decoded.role;
    }
  }
}
