import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TestService } from '../../services/test.service';

@Component({
  selector: 'app-add-test',
  templateUrl: './add-test.component.html',
  styleUrls: ['./add-test.component.scss']
})
export class AddTestComponent implements OnInit {
  testForm!: FormGroup;
  errorMessage = '';
  petTypes = ['Dog', 'Cat'];
  localities = [/* (same locality array as update-test.component.ts) */];

  constructor(
    private fb: FormBuilder,
    private testService: TestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.testForm = this.fb.group({
      vetRegistrationNumber: ['', Validators.required],
      petType: ['', Validators.required],
      petMicrochipNumber: ['', Validators.required],
      ownerIdCardNumber: ['', Validators.required],
      ownerFirstName: ['', Validators.required],
      ownerLastName: ['', Validators.required],
      ownerContactNumber: ['', Validators.required],
      ownerEmailAddress: ['', [Validators.required, Validators.email]],
      ownerAddress: ['', Validators.required],
      ownerLocality: ['', Validators.required],
      ownerPostCode: ['', Validators.required],
      isVirusDetected: [false]
    });
  }

  onSubmit(): void {
    if (this.testForm.invalid) {
      this.errorMessage = 'Please complete all required fields.';
      return;
    }

    this.testService.addTest(this.testForm.value).subscribe({
      next: () => this.router.navigate(['/tests']),
      error: () => this.errorMessage = 'Failed to submit test.'
    });
  }
}
