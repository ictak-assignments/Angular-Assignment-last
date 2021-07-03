import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
// import { AuthorService } from 'src/app/author.service';
import {authorModel } from './authorModel';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {

  authors:authorModel[];
  showAddButton:boolean;

  // constructor( private authorService:AuthorService) { }
  constructor(private http : HttpClient,public _auth:AuthService) { }
  //to fetch authors from backend
  getAuthors(){
    return this.http.get<any>('http://localhost:3000/authors');
  }
  isLogged(){
    if (this._auth.loggedIn()){
      console.log('true')
      this.showAddButton = true;
      return true
    }
    else {
      this.showAddButton = false
      return false
    }
  }

  ngOnInit(): void {
    this.isLogged();
    this.getAuthors()
    .subscribe((data:any) =>{
      this.authors = JSON.parse(JSON.stringify(data));
      console.log(this.authors)
    })
  }
}



  