// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http'

// @Injectable({
//   providedIn: 'root'
// })
// export class BookService {

//   constructor(private http : HttpClient) { }
//   //to fetch books from backend
//   getBooks(){
//     return this.http.get<any>('http://localhost:3000/books');
//   }
//   getBookById(){
//     return this.http.get<any>('http://localhost:3000/books/60bba7ec3900b31e24012762');
//   }

//   newBook()
//   {
//      return this.http.post<any>('http://localhost:3000/insert',{"book":item})
    
//   }
// }


// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';


// export class ProductService {
//   constructor(private http : HttpClient) { }
//   getProducts(){
//     //you must retun 
//     return this.http.get<any>('http://localhost:3000/products');
//   }
//   newProduct(item)
//    {
//      return this.http.post("http://localhost:3000/insert",{"product":item})
//      .subscribe(data =>{console.log(data)})
//    }
// }
