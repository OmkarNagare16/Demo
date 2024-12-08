import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-registration',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './patient-registration.component.html',
  styleUrls: ['./patient-registration.component.scss']
})
export class PatientRegistrationComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder,private router:Router) {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required, this.noNumbersValidator()]],
      lastName: ['', [Validators.required, this.noNumbersValidator()]],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      gender: ['', Validators.required],
    }, {
      validators: this.passwordMatchValidator
    });
  }

  // Custom validator to check if the value contains any numbers
  noNumbersValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const regex = /\d/; // Regex to check for digits
      return regex.test(value) ? { 'noNumbers': true } : null;
    };
  }

  // Password and confirm password match validator
  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  // Form submission handler
  onSubmit() {
    if (this.signupForm.valid) {
      console.log('Form Data:', this.signupForm.value);
      this.router.navigate(['/login']);
    } else {
      console.log('Form Invalid');
    }
  }
}

