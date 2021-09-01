import { Injectable } from '@angular/core';
import {HttpClient ,HttpHeaders} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Product } from './product.model';
import { User } from './user.model';
import { Subject } from "rxjs";
import { formatCurrency } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private product$ = new Subject<Product[]>();
  user : User;
  selectedProduct :Product = {
    _id:'',
    username:'',
    productName:'',
    productType:'',
    availibilityDate:'',
    price:'',
    productImage:''
  }
  products:Product[] | undefined;

  constructor(private http:HttpClient) { }

  // postProduct(product:Product){
  //   // console.log(product.productName)
  //   console.log(product.productImage)
  //   return this.http.post(environment.apiBaseUri+'/add',product);
  // }

  postProduct(username : string , productName:string , productType:string , availibilityDate:string , price:string , productImage : File): void {
    const productData = new FormData();
    productData.append('username' , username);
    productData.append("productName" ,productName );
    productData.append("productType" , productType);
    productData.append("availibilityDate" , availibilityDate);
    productData.append("price" , price);
    productData.append("productImage" , productImage , productName);
    console.log(productData)
    // const product = {
    //   productName : productName,
    //   productType : productType,
    //   availibilityDate : availibilityDate,
    //   price: price,
    //   productImage : productImage,
    // }
    // console.log(product)
    this.http.post<{ product: Product }>(environment.apiBaseUri+'/add',productData)
      .subscribe(productData => {
        const product: Product = {
        _id: productData.product._id,
        username : productData.product.username,
        productName: productData.product.productName,
        productType: productData.product.productType,
        availibilityDate : productData.product.availibilityDate,
        price : productData.product.price , 
        productImage: productData.product.productImage
      };
      this.products.push(product);
      this.product$.next(this.products);
    })
    // });
  }

  // }
  getProductList(){
   return  this.http.get(environment.apiBaseUri+'/display')
  }

  putProduct(_id  : string , username :string , productName:string , productType:string , availibilityDate:string , price:string , productImage : File): void{
    // const id = product._id;
    // console.log(id);
    // return this.http.put(environment.apiBaseUri+'/'+id , product);
    const id = _id;
    console.log(id);
    const path  = "http://localhost:4000/api%20/" + id;
    const productData = new FormData();
    productData.append("username" , username)
    productData.append("productName" ,productName );
    productData.append("productType" , productType);
    productData.append("availibilityDate" , availibilityDate);
    productData.append("price" , price);
    productData.append("productImage" , productImage , productName);
    console.log(productData)
    this.http.put<{product:Product}>(path,productData).subscribe(productData => {
      const product: Product = {
      _id: productData.product._id,
      username:productData.product.username,
      productName: productData.product.productName,
      productType: productData.product.productType,
      availibilityDate : productData.product.availibilityDate,
      price : productData.product.price , 
      productImage: productData.product.productImage
    };
    this.products.push(product);
    this.product$.next(this.products);
  })

  }

  deleteproduct(_id:String){
    const id = _id;
    // console.log(environment.apiBaseUri+'/'+id);
    return this.http.delete(environment.apiBaseUri+'/'+id)
  }
}