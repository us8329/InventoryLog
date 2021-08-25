import { Injectable } from '@angular/core';
import {HttpClient ,HttpHeaders} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  selectedProduct :Product = {
    _id:'',
    productName:'',
    productType:'',
    availibilityDate:'',
    price:'',
    productImage:''
  }
  products:Product[] | undefined;

  constructor(private http:HttpClient) { }

  postProduct(product:Product){
    return this.http.post(environment.apiBaseUri+'/add',product);
  }

  getProductList(){
    return this.http.get(environment.apiBaseUri+'/display')
  }

  putProduct(product : Product){
    const id = product._id;
    // console.log(id);
    return this.http.put(environment.apiBaseUri+'/'+id , product);
  }

  deleteproduct(_id:String){
    const id = _id;
    // console.log(environment.apiBaseUri+'/'+id);
    return this.http.delete(environment.apiBaseUri+'/'+id)
  }
}
