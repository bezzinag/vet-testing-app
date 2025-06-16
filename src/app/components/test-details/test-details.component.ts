import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestService } from '../../services/test.service';
import { Test } from '../../models/test.model';

// TestDetailsComponent 
// -> displays details of specific test based on the test ID from the route parameters.
// -> retrieves the test data from the TestService and handles any errors that may occur during the data retrieval process.
// -> used to view detailed information about a test.
@Component(
  {
    selector: 'app-test-details',
    templateUrl: './test-details.component.html',
    styleUrls: ['./test-details.component.scss']
  })

//Responsible for fetching and displaying the details of a specific test.
export class TestDetailsComponent implements OnInit 
{
  test?: Test;
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private testService: TestService) {} 

  
  ngOnInit(): void 
  {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.testService.getTestById(id).subscribe(
      {
        next: (data) => this.test = data,
        error: () => this.errorMessage = 'Failed to load test details.'
      });
  }
}