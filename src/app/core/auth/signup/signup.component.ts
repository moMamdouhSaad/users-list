import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { resetAuth, signUp } from '../auth.actions';
import { selectAuthError, selectAuthLoading } from '../auth.selectors';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  standalone:true,
  imports:[CommonModule,RouterModule,FormsModule,ReactiveFormsModule]
})
export class SignupComponent implements OnInit, OnDestroy {
  signUpForm!: FormGroup;
  error$ = this.store.select(selectAuthError); // Import and use the selector for auth error
  loading$ = this.store.select(selectAuthLoading); // Import and use the selector for auth error


  constructor(private fb: FormBuilder, private store: Store){}
  
  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      const credentials = this.signUpForm.value;
      this.store.dispatch(signUp({ credentials }));
    }
  }
  ngOnDestroy(): void {
    this.store.dispatch(resetAuth());
  }



}
