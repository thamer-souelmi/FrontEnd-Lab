import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  password = '';
  errorMessage = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  login() {
  if (!this.email || !this.password) {
    this.errorMessage = 'Please enter email and password';
    return;
  }

  this.loading = true;
  this.errorMessage = '';

  this.authService.login(this.email, this.password).subscribe({
    next: (res:LoginResponse) => {
      this.loading = false;
      this.authService.storeToken(res);
      this.router.navigate(['/livre']);
       this.cdr.detectChanges();

    },
    error: (err) => {
      this.loading = false; // ✅ MUST BE FIRST
      this.errorMessage = err?.error?.detail || 'Invalid email or password';
      console.error(err);
      this.cdr.detectChanges();
    }
  });
}
}
