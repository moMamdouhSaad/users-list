import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { loadSingleUser, resetSingleUser } from '../../shared/stores/single-user-store/single-user.actions';
import { selectSingleUser, selectSingleUserError, selectSingleUserLoading } from '../../shared/stores/single-user-store/single-user.selectors';

@Component({
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.scss'],
  standalone:true,
  imports:[CommonModule, RouterModule,NgxSkeletonLoaderModule]
})
export class SingleUserComponent implements OnInit,OnDestroy{
  user$ = this.store.select(selectSingleUser);
  loading$ = this.store.select(selectSingleUserLoading);
  error$ = this.store.select(selectSingleUserError);

  constructor(private store: Store,private route: ActivatedRoute){}


ngOnInit(): void {
  const userId = this.route.snapshot.params['id'];
  this.store.dispatch(loadSingleUser({ userId }));
}

ngOnDestroy(): void {
  this.store.dispatch(resetSingleUser());
}
}
