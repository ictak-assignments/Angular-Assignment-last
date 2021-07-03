import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

// import { BookService } from 'src/app/book.service';
import { bookModel } from '../books/bookModel';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  books:bookModel;
  imageWidth:number = 50;
  imageMargin: number = 2;
  showImage: boolean = true;
  bookid:string;

// constructor(private bookService:BookService,public http:HttpClient) { }
 constructor(public http:HttpClient,private route:ActivatedRoute,private router:Router) { }
 getBookById(){
  return this.http.get<any>(`http://localhost:3000/books/${this.bookid}`);
}

  ngOnInit(): void {
    this.bookid = this.route.snapshot.params['Id'];
    this.getBookById()
    .subscribe((data:any) =>{
      this.books = JSON.parse(JSON.stringify(data));
    })
  }
 
  destroyBook(){
    return this.http.delete(`http://localhost:3000/books/${this.bookid}`)
  }
  deleteBook(){
    this.destroyBook()
    .subscribe(()=>{
      console.log('deletion successful')
    })
    console.log('hi how are you');
    this.router.navigate(['/books'])
  }
}


  // editBook(item:any)
  // {
  //   return this.http.put(`http://localhost:3000/books/${this.id}`,{item})
  //   .subscribe(data =>{ console.log(data)})
  // }
  // updateBook()
  // {
  //   this.editBook(this.book);
  //   alert("success");
  //   // alert(this.book);
  //   this.router.navigate(['/books'])
  // }




// To Delete Any Employee
// deleteEmployee(empid) {
//   return this.http.get(`${this.uri}/deleteEmployee/${empid}`);
//   }
 

// Delete Employee
// deleteEmployee(empid) {
//   this.service.deleteEmployee(empid).subscribe(() => {
//   this.getEmployees();
//   });
//   }


