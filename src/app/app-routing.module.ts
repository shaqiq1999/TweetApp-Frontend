import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommentsComponent } from './comments/comments.component';
import { ErrorComponent } from './error/error.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { RouteGuardService } from './service/route-guard.service';
import { TweetsComponent } from './tweets/tweets.component';
import { UpdateComponent } from './update/update.component';
import { UserTweetsComponent } from './user-tweets/user-tweets.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'tweets/login', component: LoginComponent },
  { path: 'tweets/forgot', component: ForgotPasswordComponent },
  { path: 'tweets/register', component: RegisterComponent },
  { path: 'tweets/:userName/home', component: HomeComponent, canActivate:[RouteGuardService] },
  { path: 'tweets/:userName/update/:tweetId', component: UpdateComponent, canActivate:[RouteGuardService] },
  { path: 'tweets/:userName/all', component: TweetsComponent, canActivate:[RouteGuardService] },
  { path: 'tweets/:userName/users/all', component: UsersComponent, canActivate:[RouteGuardService] },
  { path: 'tweets/logout', component: LogoutComponent, canActivate:[RouteGuardService] },
  { path: 'tweets/:UserName2/user/:UserName1', component: UserTweetsComponent, canActivate:[RouteGuardService] },
  { path: 'tweets/:userName/comments/:tweetId', component: CommentsComponent, canActivate:[RouteGuardService] },
  { path: '**', component: ErrorComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
