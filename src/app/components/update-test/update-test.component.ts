import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TestService } from '../../services/test.service';
import { Test } from '../../models/test.model';

// UpdateTestComponent 
// -> allows users to update an existing test for a pet.
// -> retrieves the test details by ID,
// -> initializes a form with the test data, and submits the updated information back to the server.

@Component(
  {
    selector: 'app-update-test',
    templateUrl: './update-test.component.html',
    styleUrls: ['./update-test.component.scss']
  })

// responsible for updating an existing test entry in the system.
export class UpdateTestComponent implements OnInit 
{
  testForm!: FormGroup;
  errorMessage = '';
  testId!: number;

  localities = [ /* ... same list ... */ ];  
  petTypes = ['Dog', 'Cat'];

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private testService: TestService, private router: Router) {}

  ngOnInit(): void 
  {
    this.testId = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.testId) 
      {
        this.errorMessage = 'Invalid test ID.';
        return;
      }

    this.testService.getTestById(this.testId).subscribe(
      {
        next: (test: Test) => this.initForm(test),
        error: () => this.errorMessage = 'Test not found.'
      });
  }

 
  // Initializ the form the test data retrieved from the service.
  // The ownerIdCardNumber is validated against the specific pattern
  // If the provided ID does not match -> fallback ID is used to prevent form submission errors.
  private initForm(test: Test): void 
  {
    const validIdPattern = /^\d{7}[A-Z]$/; // Matches 7 digits followed by an uppercase letter
    
    const fallbackId = '1234567A'; // to prevent form submission errors

    const safeOwnerId = validIdPattern.test(test.ownerIdCardNumber) ? test.ownerIdCardNumber : fallbackId; 
    
    // Initialize the form with the test data and validators.
    this.testForm = this.fb.group(
      {
        vetRegistrationNumber: [test.vetRegistrationNumber, Validators.required],
        petType: [test.petType, Validators.required], 
        petMicrochipNumber: [test.petMicrochipNumber, Validators.required],
        ownerIdCardNumber: [safeOwnerId, [Validators.required, Validators.pattern(validIdPattern)]],
        ownerFirstName: [test.ownerFirstName, Validators.required],
        ownerLastName: [test.ownerLastName, Validators.required],
        ownerContactNumber: [test.ownerContactNumber, [Validators.required, Validators.pattern(/^\d{8,}$/)]],
        ownerEmailAddress: [test.ownerEmailAddress, [Validators.required, Validators.email]],
        ownerAddress: [test.ownerAddress, Validators.required],
        ownerLocality: [test.ownerLocality, Validators.required],
        ownerPostCode: [test.ownerPostCode, [Validators.required, Validators.pattern(/^[A-Z]{3} \d{4}$/)]],
        isVirusDetected: [test.isVirusDetected]
      });
  }

  // Method for handling form submission.
  onSubmit(): void 
  {
    if (this.testForm.invalid) 
      {
        this.errorMessage = 'Please correct the errors in the form.';
        return;
      }

    this.testService.updateTest(this.testId, this.testForm.value).subscribe(
      {
        next: () => this.router.navigate(['/tests']),
        error: () => this.errorMessage = 'Failed to update test.'
      });
  }
}
