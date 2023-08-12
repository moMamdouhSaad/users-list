import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit,  ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { debounceTime, Subject, take, takeUntil } from 'rxjs';
import { User } from 'src/app/models/User.models';
import { deleteUser, loadUsers } from './store/users-list.actions';
import { selectDeleteUserLoading, selectTotalPages, selectUserList, selectUsersLoading } from './store/users-list.selectors';

@Component({
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, NgxSkeletonLoaderModule, FormsModule, ReactiveFormsModule]
})
export class UsersListComponent implements OnInit,OnDestroy{

  users$ = this.store.select(selectUserList);
  loading$ = this.store.select(selectUsersLoading);
  userDeleteLoading$ = this.store.select(selectDeleteUserLoading);
  totalPages$ = this.store.select(selectTotalPages);

  usersPerPage = 10;
  pageNumber = 1
  isFirstPage: boolean = false;
  isLastPage: boolean = false;
  perPageOptions: number[] = [5, 10, 15];
  perPageInputControl = new FormControl('');
  userDeleted!: User;

  @ViewChild('closebutton', { static: false }) closebuttonRef!: ElementRef<HTMLButtonElement>;
  private destroy$: Subject<void> = new Subject<void>();


  constructor(private store: Store, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const usersPerPageParam = this.route.snapshot.queryParams['per_page'];
    if (usersPerPageParam) {
      this.perPageInputControl.patchValue(usersPerPageParam);
    } else {
      this.router.navigateByUrl(`/users-list?page=1&per_page=10`);
      this.perPageInputControl.patchValue('10');
    }

    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe(params => {
      const page = params['page'];
      const perPage = params['per_page'];
      if (page && perPage) {
        this.usersPerPage = parseInt(perPage)
        this.pageNumber = parseInt(page)
        this.store.dispatch(loadUsers({ page, perPage: perPage }));
      } else {
        this.store.dispatch(loadUsers({ page: this.pageNumber, perPage: this.usersPerPage }));
      }
    });

    this.perPageInputControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(perPageNumber => {
      if (perPageNumber) {
        this.pageNumber = 1;
        this.usersPerPage = parseInt(perPageNumber as string)
        this.router.navigateByUrl(`/users-list?page=1&per_page=${perPageNumber}`);
      }
    })
  }


  loadNextPage() {
    this.pageNumber++
    this.router.navigateByUrl(`/users-list?page=${this.pageNumber}&per_page=${this.usersPerPage}`);
  }

  loadPreviousPage() {
    this.pageNumber--
    this.router.navigateByUrl(`/users-list?page=${this.pageNumber}&per_page=${this.usersPerPage}`);
  }


  getPageNumbers(totalPages: number): number[] {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  setUserDeleted(user: User):void {
    this.userDeleted = user;
  }

  deleteUser():void {
    this.store.dispatch(deleteUser({ userId: this.userDeleted.id }))
    this.userDeleteLoading$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      if (!data) {
        this.closebuttonRef.nativeElement.click();
        this.showToast();
      }
    })
  }

  showToast() {
    const toastElement = document.querySelector('.toast');
    if (toastElement) {
      const toast = new (window as any).bootstrap.Toast(toastElement, {
        animation: true,
        autohide: true,
        delay: 3000,
        classname: `bg-success text-light`
      });
      toast.show()
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
