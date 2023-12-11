import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  public loginForm : FormGroup;

  constructor(private formBuilder:FormBuilder, private toastController: ToastController, private router: Router,
    private authService: AuthService
    ) {
    //hacer los campos de user y password requeridos
    this.loginForm = this.formBuilder.group({
      user: ['',Validators.required],
      password: ['',Validators.required],
    });
   }

  async login() {
    if (this.loginForm && this.loginForm.valid) {
      const username = this.loginForm.get('user')?.value;
      const password = this.loginForm.get('password')?.value;

      if (this.authService.login(username, password)) {
        // Autenticación exitosa, redirige al usuario a la página principal.
        // Reemplaza 'home' con la ruta correcta.
        this.router.navigate(['/tabs/tab1']);
      } else {
        // Autenticación fallida, muestra un mensaje de error o realiza otras acciones.
        const toast = await this.toastController.create({
          message: 'Credenciales incorrectas. Por favor, inténtalo de nuevo.',
          duration: 3000, // Duración del toast en milisegundos
          position: 'bottom', // Posición del toast (top, middle, bottom)
          color: 'danger', // Color del toast
        });
        toast.present();
      }
    }  }
}
