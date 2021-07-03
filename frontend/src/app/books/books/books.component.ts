import { Component, OnInit } from '@angular/core';
// import { BookService } from 'src/app/book.service';
import { bookModel } from './bookModel';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})

export class BooksComponent implements OnInit {

  books:bookModel[];
  imageWidth:number = 50;
  imageMargin: number = 2;
  showImage: boolean = true;
  showAddButton:boolean;

  // constructor(private bookService:BookService,public http:HttpClient) { }
  constructor(private http:HttpClient,public _auth:AuthService){}
  getBooks(){
    return this.http.get<any>('http://localhost:3000/books');
  }
  isLogged(){
    if (this._auth.loggedIn()){
      console.log('true')
      this.showAddButton = true;
      return true
    }
    else {
      this.showAddButton = false;
      return false
    }
  }

  ngOnInit(): void {
    this.isLogged();
    this.getBooks()
    .subscribe((data:any) =>{
      this.books = JSON.parse(JSON.stringify(data));
      console.log(this.books)
    })
  }
}


