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
    this.extractUserRole(); // Extract user role from token
    this.loadTests();
    
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
    this.userRole = decoded.roles?.replace('ROLE_', '');
    console.log('User Role:', this.userRole); // should now say: CLERK
  }
}


  deleteTest(id: number): void {
    const confirmed = confirm('Are you sure you want to delete this test?');
    if (!confirmed) return;

    this.testService.deleteTest(id).subscribe({
      next: () => {
        this.tests = this.tests.filter(test => test.testId !== id);
      },
      error: (err) => {
        console.error('Delete failed:', err);
        alert('Failed to delete test.');
      }
    });
  }
}
