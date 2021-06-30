import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { authorModel } from '../authors/authorModel';
import { ActivatedRoute,Router } from '@angular/router';
@Component({
  selector: 'app-show-author',
  templateUrl: './show-author.component.html',
  styleUrls: ['./show-author.component.css']
})
export class ShowAuthorComponent implements OnInit {
  authors:authorModel;
  id:string;

  constructor(private router:Router,private route:ActivatedRoute,private http:HttpClient) { }
  getAuthorById(){
    return this.http.get<any>(`http://localhost:3000/authors/${this.id}`);
  }

 
  ngOnInit(): void {
    this.id = this.route.snapshot.params['Id'];
    this.getAuthorById()
    .subscribe((data:any) =>{
      this.authors = JSON.parse(JSON.stringify(data));
    })
  }
 
  destroyAuthor(){
    return this.http.delete(`http://localhost:3000/authors/${this.id}`)
  }
  deleteAuthor(){
    this.destroyAuthor()
    .subscribe(()=>{
      console.log('deletion successful')
    })
    console.log('hi how are you');
    this.router.navigate(['/authors'])
  }
}
