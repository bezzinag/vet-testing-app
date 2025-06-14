import { Component, OnInit } from '@angular/core';
import { TestService } from '../../services/test.service';
import { Test } from '../../models/test.model';

@Component({
  selector: 'app-view-tests',
  templateUrl: './view-tests.component.html',
  styleUrls: ['./view-tests.component.scss']
})
export class ViewTestsComponent implements OnInit {
  tests: Test[] = [];
  errorMessage = '';

  constructor(private testService: TestService) {}

  ngOnInit(): void {
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
}
