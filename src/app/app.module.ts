import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthGuard } from 'src/app/core/auth/guards/auth.guard';
import { LoginComponent } from 'src/app/core/auth/login/login.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthEffects } from './core/auth/auth.effects';
import { authReducer } from './core/auth/auth.reducer';
import { IsLoggedInGuard } from './core/auth/guards/isLoggedInGuard.guard';
import { UserListEffects } from './pages/users-list/store/users-list.effects';
import { userListReducer } from './pages/users-list/store/users-list.reducer';
import { singleUserReducer } from './shared/stores/single-user-store/single-user.reducer';
import { SingleUserEffects } from './shared/stores/single-user-store/single-user.effects';
import {  userEditorReducer } from './pages/user-editor/stores/user-editor.reducer';
import {  UserEditorEffects } from './pages/user-editor/stores/user-editor.effects';
import { NavbarComponent } from './core/components/navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginComponent,
    NavbarComponent,
    StoreModule.forRoot({}), 
    EffectsModule.forRoot([AuthEffects, UserListEffects, SingleUserEffects,UserEditorEffects]),
    StoreModule.forRoot({ auth: authReducer,userList: userListReducer, singleUser: singleUserReducer,userEditor: userEditorReducer  }),

  ],
  providers: [AuthGuard,IsLoggedInGuard],
  bootstrap: [AppComponent],
})
export class AppModule { }
