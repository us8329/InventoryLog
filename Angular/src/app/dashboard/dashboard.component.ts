import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from 'src/app/shared/product.model';
import { ProductService } from 'src/app/shared/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers:[ProductService]
})
export class DashboardComponent implements OnInit {

  nav_heading="Mean Crud Demo";
  imageData:string | undefined;
  serverErrormessage:string |undefined;
  constructor(public productService:ProductService , private router:Router) { }

  ngOnInit(): void {
    // this.resetForm(form);
    this.refreshProductList();
  }
  
  onFileSelect(event:Event){
    console.log("file selected"); 
    const file = (event.target as HTMLInputElement).files;
    console.log(file);
    const allowedFiles = ["image/png" , "image/jpg" , "image/jpeg"]
    
  }

  onSubmit(form: NgForm){
    if(form.value._id == "") {
      
    this.productService.postProduct(form.value).subscribe(
    res=>{
        this.resetForm(form);
        this.refreshProductList();
        // form.value._id = "";
      },
      err=>{
        if(err.status===422){
          this.serverErrormessage = err.console.error.join('<br/>')
        }else{
          this.serverErrormessage = 'Something went wrong , please contact admin. ';
        }
      })
    }
    
  else{
    this.productService.putProduct(form.value).subscribe(
    res=>{
      this.resetForm(form);
      this.refreshProductList();        
    },
    err=>{
      if(err.status===422){
        this.serverErrormessage = err.console.error.join('<br/>')
      }else{
        this.serverErrormessage = 'Something went wrong , please contact admin. ';
      }

    })
  }
}
    resetForm(form:NgForm){
      if(form)
        form.reset();
      this.productService.selectedProduct={
        _id:'',
        productName:'',
        productType:'',
        availibilityDate:'',
        price:'',
        productImage:''
      };
      
      this.serverErrormessage='';
    }

    refreshProductList(){
      this.productService.getProductList().subscribe((res)=>{
        this.productService.products =res as Product[];
      });
    }

    onEdit(product : Product){
      if(confirm('Edit product '+ product.productName + "?")==true){
      this.productService.selectedProduct = product;
      document.getElementById("productform")?.scrollIntoView({behavior:'smooth'})
    }
  }
    onDelete(product : Product , form:NgForm){
      // console.log(_id)
      const id = product._id;
      if(confirm('Are you sure you want to delete product ' + product.productName + "?")==true){
        this.productService.deleteproduct(id).subscribe(
          (res)=>{
            this.refreshProductList();  
            this.resetForm(form);
          })
      }
    }
    toList(){
      document.getElementById("list")?.scrollIntoView({behavior:'smooth'})
    }

    productimage:string = 'assets/images/football.jpg'; 
}
