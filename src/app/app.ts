import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('book');
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    const token = this.authService.getToken();
    if (!token) {
        this.router.navigate(['']); // Redirect to login page if not authenticated
      // Redirect to login page or handle unauthenticated state
    } 
  }
}
