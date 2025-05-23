// Angular CommonModule provides common directives like ngIf and ngFor
import { CommonModule } from '@angular/common';
// Component decorator to define Angular component
import { Component } from '@angular/core';
// Angular forms modules and utilities
import {
  FormBuilder, // Service to help build forms
  FormGroup, // Represents a group of form controls
  ReactiveFormsModule, // Module for reactive forms
  Validators, // Built-in validators for form controls
} from '@angular/forms';

/**
 * ContactFormComponent
 * This component provides a contact form with validation and submission feedback.
 */
@Component({
  selector: 'app-contact-form', // Selector for using this component in templates
  imports: [CommonModule, ReactiveFormsModule], // Required Angular modules
  templateUrl: './contact-form.component.html', // HTML template for the component
  styleUrl: './contact-form.component.scss', // SCSS styles for the component
})
export class ContactFormComponent {
  /**
   * Reactive form group for the contact form
   */
  contactForm: FormGroup;
  /**
   * Status of the form submission: 'success', 'error', or null
   */
  submissionStatus: 'success' | 'error' | null = null;

  /**
   * Constructor injects FormBuilder and initializes the form group with controls and validators
   * @param fb FormBuilder instance for building the form
   */
  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      // Name: required, minimum 3 characters
      name: ['', [Validators.required, Validators.minLength(3)]],
      // Email: required, must be a valid email
      email: ['', [Validators.required, Validators.email]],
      // Subject: required, maximum 50 characters
      subject: ['', [Validators.required, Validators.maxLength(50)]],
      // Message: required, minimum 10 characters
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  /**
   * Getter for the name form control
   */
  get name() {
    return this.contactForm.get('name');
  }

  /**
   * Getter for the email form control
   */
  get email() {
    return this.contactForm.get('email');
  }

  /**
   * Getter for the subject form control
   */
  get subject() {
    return this.contactForm.get('subject');
  }

  /**
   * Getter for the message form control
   */
  get message() {
    return this.contactForm.get('message');
  }

  /**
   * Handles form submission. Sets submissionStatus to 'success' if valid, otherwise logs error.
   * Resets submissionStatus after 5 seconds.
   */
  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Feedback Submitted!', this.contactForm.value);
      this.submissionStatus = 'success';
    } else {
      console.log('Form is valid!');
    }

    setTimeout(() => {
      this.submissionStatus = null;
    }, 5000);
  }
}
