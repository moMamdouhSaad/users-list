import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { login, resetAuth } from '../auth.actions';
import { selectAuthError, selectAuthLoading } from '../auth.selectors';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone:true,
  imports:[CommonModule, RouterModule,FormsModule, ReactiveFormsModule,HttpClientModule,
  ]
})
export class LoginComponent  implements OnInit,OnDestroy{
  loginForm!: FormGroup;
  error$ = this.store.select(selectAuthError); // Import and use the selector for auth error
  loading$ = this.store.select(selectAuthLoading); // Import and use the selector for auth error


  constructor(private fb: FormBuilder, private store: Store){
  }
  ngOnInit(): void {

    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
      
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
      this.store.dispatch(login({ credentials }));
    }
  }

  ngOnDestroy(): void {
    this.store.dispatch(resetAuth());
  }

}
