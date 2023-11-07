import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  user: string;
  password: string;
  public loginForm : FormGroup;

  constructor(private formBuilder:FormBuilder, private toastControler: ToastController, private router: Router) {
    this.user = "";
    this.password = "";
    //hacer los campos de user y password requeridos
    this.loginForm = this.formBuilder.group({
      user: ['',Validators.required],
      password: ['',Validators.required],
    });
   }

  async login() {
    this.user = this.loginForm.value.user;
    this.password = this.loginForm.value.password;
    if (this.user == "lluan" && this.password == "1234") {
      const toast = await this.toastControler.create({
        message: 'Bienvenido '+this.user,
        duration: 2000,
        position: 'top',
        color: 'success'
      });
      toast.present();
      await new Promise(resolve => setTimeout(resolve, 2000));
      this.router.navigate(['/tabs/tab1']);
    } else {
      const toast = await this.toastControler.create({
        message: 'Credenciales Incorrectas',
        duration: 2000,
        position: 'top',
        color: 'danger'
      });
      toast.present();
      this.loginForm.reset();
    }
  }
}
