import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { Subject, takeUntil } from 'rxjs';
import { UpdatedUserApiRequest } from 'src/app/models/User.models';
import { loadSingleUser } from 'src/app/shared/stores/single-user-store/single-user.actions';
import { selectSingleUser, selectSingleUserError, selectSingleUserLoading } from 'src/app/shared/stores/single-user-store/single-user.selectors';
import { createUser, updateUser } from './stores/user-editor.actions';
import { selectLoading, selectUpdateUserSuccess } from './stores/user-editor.selectors';

@Component({
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule, NgxSkeletonLoaderModule]
})
export class UserEditorComponent implements OnInit, OnDestroy {
  user$ = this.store.select(selectSingleUser);
  loading$ = this.store.select(selectSingleUserLoading);
  requestLoading$ = this.store.select(selectLoading);
  error$ = this.store.select(selectSingleUserError);
  success$ = this.store.select(selectUpdateUserSuccess);

  form!: FormGroup;
  isUpdating!: boolean;

  private destroy$: Subject<void> = new Subject<void>();


  constructor(private store: Store, private route: ActivatedRoute, private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      job: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const userId = this.route.snapshot.params['id'];
    if (userId) {
      this.isUpdating = true;
      this.store.dispatch(loadSingleUser({ userId }));
      this.store.select(selectSingleUser).pipe(takeUntil(this.destroy$)).subscribe((user) => {
        console.log(user)
        this.form.patchValue({
          name: (user?.first_name || '') + ' ' + (user?.last_name || ''),
          job: ''
        });
      });
    } else {
      this.isUpdating = false;
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const formValues = this.form.value;
      const id = this.route.snapshot.params['id']
      const request: UpdatedUserApiRequest = {
        name: formValues.name,
        job: formValues.job

      }
      if (this.isUpdating) {
        this.store.dispatch(updateUser({ id, ...request }));
      } else {
        this.store.dispatch(createUser({ ...request }));

      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
