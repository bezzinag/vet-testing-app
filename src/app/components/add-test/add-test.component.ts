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
  localities = [
    'Attard', 'Balzan', 'Birkirkara', 'Birżebbuġa', 'Fgura', 'Gżira', 'Ħamrun', 'Iklin',
    'Luqa', 'Marsa', 'Marsaskala', 'Marsaxlokk', 'Mellieħa', 'Mosta', 'Msida', 'Naxxar',
    'Paola', 'Pembroke', 'Qormi', 'Rabat (Malta)', 'San Ġiljan', 'Sliema', 'Swieqi',
    'Tarxien', 'Valletta', 'Żabbar', 'Żebbuġ (Malta)', 'Żejtun', 'Żurrieq'
  ];

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
      ownerIdCardNumber: ['', [Validators.required, Validators.pattern(/^\d{7}[A-Z]$/)]],
      ownerFirstName: ['', Validators.required],
      ownerLastName: ['', Validators.required],
      ownerContactNumber: ['', [Validators.required, Validators.pattern(/^\d{8,}$/)]],
      ownerEmailAddress: ['', [Validators.required, Validators.email]],
      ownerAddress: ['', Validators.required],
      ownerLocality: ['', Validators.required],
      ownerPostCode: ['', [Validators.required, Validators.pattern(/^[A-Z]{3} \d{4}$/)]],
      isVirusDetected: [false]
    });
  }

  onSubmit(): void {
    if (this.testForm.invalid) {
      this.errorMessage = 'Please complete all required fields correctly.';
      return;
    }

    this.testService.addTest(this.testForm.value).subscribe({
      next: () => this.router.navigate(['/tests']),
      error: () => this.errorMessage = 'Failed to submit test.'
    });
  }
}
