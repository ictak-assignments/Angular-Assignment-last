import { Component, OnInit } from '@angular/core';
import { bookModel2 } from '../books/bookModel';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id:string;
  // books:bookModel;

  constructor(private route:ActivatedRoute,private http:HttpClient,private router:Router) { }
  book = new bookModel2("","","","");

  getBookById(){
    return this.http.get<any>(`http://localhost:3000/books/${this.id}`);
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['Id'];
    console.log(`param is ${this.id}`);
    // the Id is the one we specified in out routing module
    this.getBookById()
    .subscribe((data:any)=>{
      this.book = JSON.parse(JSON.stringify(data));
      console.log(this.book)
    })
  }
  editBook(item:any)
  {
    return this.http.put(`http://localhost:3000/books/${this.id}`,{"book":item})
    .subscribe(data =>{ 
      // console.log(data)
    })
  }
  updateBook()
  {
    this.editBook(this.book);
    alert("success");
    this.router.navigate(['/books'])
  }

}
