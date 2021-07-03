import { Component, OnInit } from '@angular/core';
import { bookModel2 } from '../books/bookModel';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  constructor(private http:HttpClient,private router:Router) { }
  book = new bookModel2 ("","","","");

  ngOnInit(): void {
  }
  newBook(item)
   {
     return this.http.post<any>("http://localhost:3000/books",{"book":item})
     .subscribe(data =>{console.log(data)})
   }
  AddBook(){
    this.newBook(this.book);
    // console.log("called");
    alert("success");
    this.router.navigate(['/books']);
  }

}
