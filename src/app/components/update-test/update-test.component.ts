import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TestService } from '../../services/test.service';
import { Test } from '../../models/test.model';

@Component({
  selector: 'app-update-test',
  templateUrl: './update-test.component.html',
  styleUrls: ['./update-test.component.scss']
})
export class UpdateTestComponent implements OnInit {
  testForm!: FormGroup;
  errorMessage = '';
  testId!: number;

  localities: string[] = [
    'Attard', 'Balzan', 'Birgu', 'Birkirkara', 'Birżebbuġa', 'Bormla', 'Dingli', 'Fgura',
    'Floriana', 'Fontana', 'Għajnsielem', 'Għarb', 'Għargħur', 'Għaxaq', 'Gudja', 'Gżira',
    'Ħamrun', 'Iklin', 'Isla', 'Kalkara', 'Kerċem', 'Kirkop', 'Lija', 'Luqa', 'Marsa',
    'Marsaskala', 'Marsaxlokk', 'Mdina', 'Mellieħa', 'Mġarr', 'Mosta', 'Mqabba', 'Msida',
    'Mtarfa', 'Munxar', 'Nadur', 'Naxxar', 'Paola', 'Pembroke', 'Pietà', 'Qala', 'Qormi',
    'Qrendi', 'Rabat (Gozo)', 'Rabat (Malta)', 'Safi', 'San Ġiljan', 'San Ġwann', 'San Lawrenz',
    'Sannat', 'Santa Luċija', 'Santa Venera', 'Siġġiewi', 'Sliema', 'Swieqi', 'Ta’ Xbiex',
    'Tarxien', 'Valletta', 'Xagħra', 'Xewkija', 'Xgħajra', 'Żabbar', 'Żebbuġ (Gozo)',
    'Żebbuġ (Malta)', 'Żejtun', 'Żurrieq'
  ];

  petTypes: string[] = ['Dog', 'Cat'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private testService: TestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.testId = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.testId) {
      this.errorMessage = 'Invalid test ID.';
      return;
    }

    this.testService.getTestById(this.testId).subscribe({
      next: (test: Test) => this.initForm(test),
      error: () => this.errorMessage = 'Test not found.'
    });
  }

  private initForm(test: Test): void {
    this.testForm = this.fb.group({
      vetRegistrationNumber: [test.vetRegistrationNumber, Validators.required],
      petType: [test.petType, Validators.required], //i
      petMicrochipNumber: [test.petMicrochipNumber, Validators.required],
      ownerIdCardNumber: [test.ownerIdCardNumber, Validators.required],
      ownerFirstName: [test.ownerFirstName, Validators.required],
      ownerLastName: [test.ownerLastName, Validators.required],
      ownerContactNumber: [test.ownerContactNumber, Validators.required],
      ownerEmailAddress: [test.ownerEmailAddress, [Validators.required, Validators.email]],
      ownerAddress: [test.ownerAddress, Validators.required],
      ownerLocality: [test.ownerLocality, Validators.required],
      ownerPostCode: [test.ownerPostCode, Validators.required],
      isVirusDetected: [test.isVirusDetected]
    });
  }

  onSubmit(): void {
    if (this.testForm.invalid) {
      this.errorMessage = 'Please correct the errors in the form.';
      return;
    }

    this.testService.updateTest(this.testId, this.testForm.value).subscribe({
      next: () => this.router.navigate(['/tests']),
      error: () => this.errorMessage = 'Failed to update test.'
    });
  }
}
