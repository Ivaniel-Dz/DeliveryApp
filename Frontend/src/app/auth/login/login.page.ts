import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule ]
})

export class LoginPage implements OnInit {
  // Inyección de dependencias
  private fb = inject(FormBuilder);
  private router = inject(Router);

  // Formulario
  public form: FormGroup = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(5)]]
  });

  ngOnInit(): void {
    // Check if user is already authenticated
  }

  onSubmit() {
    if (this.form.valid){
      // Aquí llamaría a su método de inicio de sesión de servicio de autores
      // Para fines de prueba, solo navegaremos a las pestañas
    }
    this.router.navigate(["/tabs/home"])
  }

  loginWithGoogle(){
    // Servicio para auth con google
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

}
