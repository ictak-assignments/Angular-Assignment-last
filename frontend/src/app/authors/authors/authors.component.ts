import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
// import { AuthorService } from 'src/app/author.service';
import {authorModel } from './authorModel';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {

  authors:authorModel[];

  // constructor( private authorService:AuthorService) { }
  constructor(private http : HttpClient) { }
  //to fetch authors from backend
  getAuthors(){
    return this.http.get<any>('http://localhost:3000/authors');
  }

  ngOnInit(): void {
    this.getAuthors()
    .subscribe((data:any) =>{
      this.authors = JSON.parse(JSON.stringify(data));
      console.log(this.authors)
    })
  }
}



  