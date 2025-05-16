import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']  // ✅ Correct
})

export class UserLoginComponent implements OnInit {
  loginForm: FormGroup;
  signupForm: FormGroup;
  message: string = '';
  isLoading: boolean = false;
  isLoginMode = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {}

  // Basculer entre login et signup
  switchMode() {
    this.isLoginMode = !this.isLoginMode;
    this.message = '';
  }

  // Connexion
  async onLogin() {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.message = '';

    try {
      const { email, password } = this.loginForm.value;
      await this.authService.login(email, password);
      this.router.navigate(['/layout']); // Redirection après connexion réussie
    } catch (error: any) {
      this.message = this.getErrorMessage(error.code);
    } finally {
      this.isLoading = false;
    }
  }

  // Inscription
  async onSignup() {
    if (this.signupForm.invalid) return;

    this.isLoading = true;
    this.message = '';

    try {
      const { email, password, username } = this.signupForm.value;
      await this.authService.signUp(email, password, username);
      this.message = 'Inscription réussie! Vous pouvez maintenant vous connecter.';
      this.isLoginMode = true; // Basculer vers le mode login après inscription
    } catch (error: any) {
      this.message = this.getErrorMessage(error.code);
    } finally {
      this.isLoading = false;
    }
  }

  // Réinitialisation du mot de passe
  async resetPassword() {
    const email = this.loginForm.get('email')?.value;
    if (!email) {
      this.message = 'Veuillez entrer votre email';
      return;
    }

    this.isLoading = true;
    try {
      await this.authService.resetPassword(email);
      this.message = 'Un email de réinitialisation a été envoyé. Vérifiez votre boîte mail.';
    } catch (error: any) {
      this.message = this.getErrorMessage(error.code);
    } finally {
      this.isLoading = false;
    }
  }

  // Gestion des messages d'erreur
  private getErrorMessage(code: string): string {
    switch (code) {
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        return 'Email ou mot de passe incorrect';
      case 'auth/email-already-in-use':
        return 'Cet email est déjà utilisé';
      case 'auth/weak-password':
        return 'Le mot de passe doit faire au moins 6 caractères';
      case 'auth/invalid-email':
        return 'Email invalide';
      case 'auth/too-many-requests':
        return 'Trop de tentatives. Veuillez réessayer plus tard.';
      default:
        return 'Une erreur est survenue. Veuillez réessayer.';
    }
  }
}