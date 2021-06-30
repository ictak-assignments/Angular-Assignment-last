import { Component, OnInit } from '@angular/core';
// import { BookService } from 'src/app/book.service';
import { bookModel } from './bookModel';
import { HttpClient } from '@angular/common/http';

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

  // constructor(private bookService:BookService,public http:HttpClient) { }
  constructor(private http:HttpClient){}
  getBooks(){
    return this.http.get<any>('http://localhost:3000/books');
  }

  ngOnInit(): void {
    this.getBooks()
    .subscribe((data:any) =>{
      this.books = JSON.parse(JSON.stringify(data));
      console.log(this.books)
    })
  }
}


