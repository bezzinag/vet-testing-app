import { Component, OnInit } from '@angular/core';
import { TestService } from '../../services/test.service';
import { Test } from '../../models/test.model';
import { jwtDecode } from 'jwt-decode';

@Component(
  {
    selector: 'app-view-tests',
    templateUrl: './view-tests.component.html',
    styleUrls: ['./view-tests.component.scss']
  })

export class ViewTestsComponent implements OnInit 
{
  tests: Test[] = [];
  errorMessage: string = '';
  userRole: string = '';

  constructor(private testService: TestService) {}

  ngOnInit(): void 
  {
    this.setUserRoleFromToken();
    this.fetchTests();
  }

  private setUserRoleFromToken(): void 
  {
    const token = localStorage.getItem('token');

    if (!token) 
      {
        this.userRole = '';
        return;
      } 

    try 
    {
      const decoded: any = jwtDecode(token);
      this.userRole = decoded.roles?.replace('ROLE_', '');
      console.log('[ViewTests] User Role:', this.userRole);
    } 
    catch (error) 
      {
        console.error('[ViewTests] Token decode failed:', error);
        this.userRole = '';
      }
  }

  private fetchTests(): void 
  {
    this.testService.getAllTests().subscribe(
      {
        next: (data) => this.tests = data,
        error: (err) => {this.errorMessage = 'Failed to load tests.';
          console.error('[ViewTests] Test fetch failed:', err);}
      });
  }

  deleteTest(id: number): void 
  {
    if (!confirm('Are you sure you want to delete this test?')) return;

    this.testService.deleteTest(id).subscribe(
      {
        next: () => {this.tests = this.tests.filter(test => test.testId !== id);},

        error: (err) => {console.error('[ViewTests] Delete failed:', err);
        alert('Failed to delete test.');}
      });
  }
}
