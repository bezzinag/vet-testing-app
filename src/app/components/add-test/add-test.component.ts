import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TestService } from '../../services/test.service';

// This component allows users to add a new test for a pet, including details about the vet, pet, and owner.
@Component(
  {
    selector: 'app-add-test',
    templateUrl: './add-test.component.html',
    styleUrls: ['./add-test.component.scss']
  }
)
// AddTestComponent is responsible for creating a new test entry in the system.
export class AddTestComponent implements OnInit  

{
  testForm!: FormGroup;
  errorMessage = '';
  petTypes = ['Dog', 'Cat'];
  localities = ['Attard', 'Balzan', 'Birkirkara', 'Birżebbuġa', 'Fgura', 'Gżira', 'Ħamrun', 'Iklin',
      'Luqa', 'Marsa', 'Marsaskala', 'Marsaxlokk', 'Mellieħa', 'Mosta', 'Msida', 'Naxxar',
      'Paola', 'Pembroke', 'Qormi', 'Rabat (Malta)', 'San Ġiljan', 'Sliema', 'Swieqi',
      'Tarxien', 'Valletta', 'Żabbar', 'Żebbuġ (Malta)', 'Żejtun', 'Żurrieq'];

  // Constructor initializes form builder, test service, and router for navigation.
  // FormBuilder used to create the form group for the test form.
  constructor(private fb: FormBuilder, private testService: TestService, private router: Router) {} 
  

  // ngOnInit ->a lifecycle hook that is called after Angular has initialized all data-bound properties.
  // Typically used to perform component initialization, such as setting up the form controls.
  // we initialize the testForm with the necessary form controls and validators.
  ngOnInit(): void 
  {
    this.testForm = this.fb.group(
      {
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

  // a method that is called when the form is submitted.
  // checks if the form is valid and if not, sets an error message.
  onSubmit(): void 
  {
    if (this.testForm.invalid) 
      {
        this.errorMessage = 'Please complete all required fields correctly.';
        return;
      }

    // If the form is valid, it calls the addTest method from the TestService to submit the form data.
    this.testService.addTest(this.testForm.value).subscribe(
      {next: () => this.router.navigate(['/tests']), error: () => this.errorMessage = 'Failed to submit test.'});
  }

}
