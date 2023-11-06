import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.page.html',
  styleUrls: ['./update-product.page.scss'],
})
export class UpdateProductPage {

  public productForm : FormGroup;
  
  constructor(private formBuilder:FormBuilder, private productService: ProductService, private toastControler: ToastController, private router: Router) {
     var productAct = this.productService.getProductAct();
     var id = this.productService.getIndice();

    this.productForm = this.formBuilder.group({
      name: [productAct.name,Validators.required],
      price: [productAct.price,Validators.required],
      description: [productAct.description],
      type: [productAct.type,Validators.required],
      photo: [productAct.photo,Validators.required],
    });
   }
  
    public async actProduct(){
      console.log(this.productForm.value);
      const product = this.productForm.value;

      this.productService.updateProduct(this.productService.getIndice(),product);

      const toast = await this.toastControler.create({
        message: 'Producto Actualizado correctamente',
        duration: 2000,
        position: 'top',
        color: 'success'
      });
      toast.present();
      this.router.navigate(['/tabs/tab1']);
    }
  

  
}
