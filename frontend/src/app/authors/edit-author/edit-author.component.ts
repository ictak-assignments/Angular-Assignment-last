import { Component, OnInit } from '@angular/core';
import { authorModel2 } from '../authors/authorModel';
import { ActivatedRoute,Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-author',
  templateUrl: './edit-author.component.html',
  styleUrls: ['./edit-author.component.css']
})
export class EditAuthorComponent implements OnInit {
  id:string;
  // author = new authorModel("","","","","");
  author = new authorModel2("","","","");

  constructor(private route:ActivatedRoute,private http:HttpClient,private router:Router) { }

  getAuthorsById() {
    return this.http.get<any>(`http://localhost:3000/authors/${this.id}`);
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['Id'];
    this.getAuthorsById()
    .subscribe((data:any)=>{
      this.author = JSON.parse(JSON.stringify(data));
    })
  }
  editAuthor(item:any) {
    return this.http.put(`http://localhost:3000/authors/${this.id}`,{"author":item})
    .subscribe(data => { console.log(data)})
  }
  updateAuthor() {
    this.editAuthor(this.author);
    this.router.navigate(['/authors'])
  }

}
