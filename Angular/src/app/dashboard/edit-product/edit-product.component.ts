import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, RouterLink } from "@angular/router";
import { Product } from 'src/app/shared/product.model';

import { ProductService } from 'src/app/shared/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  action =  "Add Product"
  p:any;
  current_user  = localStorage.getItem('current_user');
  nav_heading="user : " + this.current_user;
  showMsg:boolean = false;
  Msg ="Product Added";
  private mode = "create";
  product : Product 
  imagePreview: string;
  public imageData:string 
  serverErrormessage:string |undefined;
  private postId: string; 
  //dependency injections 
  constructor(
    public productService:ProductService ,
    private router:Router , 
    public route: ActivatedRoute
  ) { }
  form = new FormGroup({
    username : new FormControl(null),
    productName : new FormControl(null),
    productType : new FormControl(null),
    availibilityDate : new FormControl(null),
    price : new FormControl(null),
    productImage :new FormControl(null),

  })
  ngOnInit(): void {
    console.log(this.route.snapshot.params.id)
    this.productService.getProductById(this.route.snapshot.params.id).subscribe((result)=>{
      console.log(result);
      this.form = new FormGroup({
        username : new FormControl(result['username']),
        productName : new FormControl(result['productName']),
        productType : new FormControl(result['productType']),
        availibilityDate : new FormControl(result['availibilityDate']),
        price : new FormControl(result['price']),
        productImage :new FormControl(result['productImage']),
      })
    })
    this.refreshProductList()
  }
  
  onFileSelect(event:Event){
    console.log("file selected"); 
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ productImage: file });
    this.form.get("productImage").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imageData = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSubmit(){
      this.Msg = "product -" + this.form.value.productName  +" updated"
      console.log("editing")
      console.log(this.route.snapshot.params.id)
      console.log(this.form.value)
      // const product: Product = {
      //   _id: this.route.snapshot.params.id ,
      //   username : this.form.value.username,
      //   productName: this.form.value.productName,
      //   productType: this.form.value.productType,
      //   availibilityDate : this.form.value.availibilityDate,
      //   price : this.form.value.price , 
      //   productImage: this.form.value.productImage
      // };
      // console.log(product);
      this.productService.putProduct(this.route.snapshot.params.id ,this.form.value)
      // .subscribe((result)=>{
        // console.log(result)
      // })
      this.router.navigateByUrl('/dashboard')
      this.form.reset();
      // this.showMsg = true;
      this.refreshProductList()
      this.imageData = null 
}



    refreshProductList(){
      this.productService.getProductList().subscribe((res)=>{
        this.productService.products =res as Product[];
      });
    }

    onEdit(product : Product ){

      this.action = "Update Product - " + product.productName +"/" + product.productType;
      this.postId = product._id;
      // console.log(this.postId)
      this.productService.selectedProduct = product;
      this.mode = "edit"
      if(confirm('Edit product '+ product.productName + "?")==true){
      document.getElementById("productform")?.scrollIntoView({behavior:'smooth'})
    }
  }
    onDelete(product : Product , form:NgForm){
      const id = product._id;
      if(confirm('Are you sure you want to delete product ' + product.productName + "?")==true){
        this.productService.deleteproduct(id).subscribe(
          (res)=>{
            this.refreshProductList();  
            this.form.reset();
          })
      }
    }

    toList(){
      this.refreshProductList()
      document.getElementById("list")?.scrollIntoView({behavior:'smooth'})
    }
    onLogout(){
        this.router.navigate(['/login'])
    }
    preback(){
      window.history.forward()
      }
      // window.setTimeout("preback()" , 0)
    }
