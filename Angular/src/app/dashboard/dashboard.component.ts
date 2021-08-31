import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, RouterLink } from "@angular/router";
import { Product } from 'src/app/shared/product.model';
import { User } from '../shared/user.model';
import { ProductService } from 'src/app/shared/product.service';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers:[ProductService]
})

export class DashboardComponent implements OnInit {
  form? : FormGroup;
  action =  "Add Product"
  p:any;
  nav_heading="Mean Crud Demo";
  showMsg:boolean = false;
  Msg ="Product Added";
  private mode = "create";
  user: User;
  product : Product 
  imagePreview: string;
  public imageData:string 
  serverErrormessage:string |undefined;
  private postId: string; 
  //dependency injections 
  constructor(
    public productService:ProductService ,
    public userService:UserService , 
    private router:Router , 
    public route: ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.form = new FormGroup({
      productName : new FormControl(null),
      productType : new FormControl(null),
      availibilityDate : new FormControl(null),
      price : new FormControl(null),
      productImage :new FormControl(null),

    })
    // this.resetForm(form);
    this.refreshProductList();

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("postId")) {
        this.mode = "edit";
        this.postId = paramMap.get("postId");
      } else {
        this.mode = "create";
        this.postId = null;
      }
    });



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
    // console.log(this.user.email)
    if(this.mode=="create"){
    console.log('adding product')
    console.log(this.form.value.productImage)
    this.productService.postProduct( this.form.value.productName ,this.form.value.productType , this.form.value.availibilityDate , this.form.value.price , this.form.value.productImage )
    this.form.reset();
    this.refreshProductList()
    this.imageData = null
    this.showMsg = true;
    // window.setTimeout(function(){location.reload()},3000)
    }
    else{
      this.Msg = "product -" + this.form.value.productName  +" updated"
      console.log("editing")
      console.log(this.postId)
      this.productService.putProduct(
        this.postId,
        this.form.value.productName ,
        this.form.value.productType , 
        this.form.value.availibilityDate , 
        this.form.value.price , 
        this.form.value.productImage) 
      this.form.reset();
      this.showMsg = true;
      this.refreshProductList()
      this.imageData = null
      // window.location.reload();
      // window.setTimeout(function(){location.reload()},3000)

  }
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
}


// import { Component, OnInit } from "@angular/core";
// import { FormGroup, FormControl, Validators } from "@angular/forms";
// import { ActivatedRoute, ParamMap } from "@angular/router";

// import { ProductService } from 'src/app/shared/product.service';
// import { Product } from 'src/app/shared/product.model';
// // import { mimeType } from "./mime-type.validator";

// @Component({
//   selector: "app-post-create",
//   templateUrl: "./post-create.component.html",
//   styleUrls: ["./post-create.component.css"]
// })
// export class PostCreateComponent implements OnInit {
//   enteredTitle = "";
//   enteredContent = "";
//   post: Post;
//   isLoading = false;
//   form: FormGroup;
//   imagePreview: string;
//   private mode = "create";
//   private postId: string;

//   constructor(
//     public postsService: PostsService,
//     public route: ActivatedRoute
//   ) {}

//   ngOnInit() {
//     this.form = new FormGroup({
//       title: new FormControl(null, {
//         validators: [Validators.required, Validators.minLength(3)]
//       }),
//       content: new FormControl(null, { validators: [Validators.required] }),
//       image: new FormControl(null, {
//         validators: [Validators.required],
//         // asyncValidators: [mimeType]
//       })
//     });
//     this.route.paramMap.subscribe((paramMap: ParamMap) => {
//       if (paramMap.has("postId")) {
//         this.mode = "edit";
//         this.postId = paramMap.get("postId");
//         this.isLoading = true;
//         this.postsService.getPost(this.postId).subscribe(postData => {
//           this.isLoading = false;
//           this.post = {
//             id: postData._id,
//             title: postData.title,
//             content: postData.content,
//             imagePath: postData.imagePath
//           };
//           this.form.setValue({
//             title: this.post.title,
//             content: this.post.content,
//             image: this.post.imagePath
//           });
//         });
//       } else {
//         this.mode = "create";
//         this.postId = null;
//       }
//     });
//   }

//   onImagePicked(event: Event) {
//     const file = (event.target as HTMLInputElement).files[0];
//     this.form.patchValue({ image: file });
//     this.form.get("image").updateValueAndValidity();
//     const reader = new FileReader();
//     reader.onload = () => {
//       this.imagePreview = reader.result as string;
//     };
//     reader.readAsDataURL(file);
//   }

//   onSavePost() {
//     if (this.form.invalid) {
//       return;
//     }
//     this.isLoading = true;
//     if (this.mode === "create") {
//       this.postsService.addPost(
//         this.form.value.title,
//         this.form.value.content,
//         this.form.value.image
//       );
//     } else {
//       this.postsService.updatePost(
//         this.postId,
//         this.form.value.title,
//         this.form.value.content,
//         this.form.value.image
//       );
//     }
//     this.form.reset();
//   }
// }
