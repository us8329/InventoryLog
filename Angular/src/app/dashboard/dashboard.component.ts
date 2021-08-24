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

  serverErrormessage:string |undefined;
  constructor(public productService:ProductService , private router:Router) { }

  ngOnInit(): void {
    this.resetForm();
    this.refreshProductList();
  }
  onSubmit(form: NgForm){
    // if(form.value._id == "") {
    this.productService.postProduct(form.value).subscribe(
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
  //   }
  // else{
  //   this.productService.putProduct(form.value).subscribe(
  //   res=>{
  //     this.resetForm(form);
  //     this.refreshProductList();        
  //   })
  // }
}
    resetForm(form?:NgForm){
      if(form)
        form.reset();
      this.productService.selectedProduct={
        _id:'',
        // username:'',
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
      this.productService.selectedProduct = product;
    }
    onDelete(_id : String , form:NgForm){
      if(confirm('Are you sure you want to delete the product ?')==true){
        this.productService.deleteproduct(_id).subscribe(
          (res)=>{
            this.refreshProductList();  
            this.resetForm(form);
          })
      }
    }
}
