import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { authorModel2 } from '../authors/authorModel';


@Component({
  selector: 'app-new-author',
  templateUrl: './new-author.component.html',
  styleUrls: ['./new-author.component.css']
})
export class NewAuthorComponent implements OnInit {
  author = new authorModel2("","","","");

  constructor(private router:Router,private http:HttpClient) { }
  newAuthor(item)
   {
     return this.http.post("http://localhost:3000/authors",{"author":item})
     .subscribe(data =>{console.log(data)})
   }
  AddAuthor(){
    this.newAuthor(this.author);
    // console.log("called");
    alert("success");
    this.router.navigate(['/authors']);
  }

  ngOnInit(): void {
  }

}
