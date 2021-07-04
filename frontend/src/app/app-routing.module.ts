import { NgModule } from '@angular/core';
import { AuthGuard } from './auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './books/books/books.component';
import { EditComponent } from './books/edit/edit.component';
import { NewComponent } from './books/new/new.component';
import { HomeComponent } from './home/home.component';
import { ShowComponent } from './books/show/show.component';
import { AuthorsComponent } from './authors/authors/authors.component';
import { EditAuthorComponent } from './authors/edit-author/edit-author.component';
import { ShowAuthorComponent } from './authors/show-author/show-author.component';
import { NewAuthorComponent } from './authors/new-author/new-author.component';
import { LoginComponent } from './login/login.component';
import { LoginHomeComponent } from './login-home/login-home.component';

const routes: Routes = [
  {path: '',component:HomeComponent,pathMatch: 'full'},
  {path:'login-admin',component:LoginHomeComponent},
  {path:'login',component:LoginComponent},
  {path:'books',component:BooksComponent},
  {path:'books/new',canActivate: [AuthGuard],component:NewComponent},
  {path:'books/:Id',component:ShowComponent},
  {path:'books/:Id/edit',canActivate: [AuthGuard],component:EditComponent},
  {path:'authors',component:AuthorsComponent},
  {path:'authors/new',canActivate: [AuthGuard],component:NewAuthorComponent},
  {path:'authors/:Id',component:ShowAuthorComponent},
  {path:'authors/:Id/edit',canActivate: [AuthGuard],component:EditAuthorComponent}

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
