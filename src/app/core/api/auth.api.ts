import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment'; 
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';



@Injectable({
  providedIn: 'root',
})
export class AuthAPI {
  private apiUrl = environment.apiUrl;
  private tokenKey = 'access_token';
  private tokenTypeKey = 'token_type';

  private http = inject(HttpClient);
  private cookieService = inject(CookieService);

  /**
   * Login with email and password
   * @param email User email
   * @param password User password
   * @returns Observable of login response
   */
  login(email: string, password: string): Observable<LoginResponse> {
    const payload: LoginRequest = { email, password };
    console.log('Login payload:', payload); // Debugging log
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, payload);
  }

  /**
   * Store token in cookies and localStorage
   * @param response Login response containing token
   */
  storeToken(response: LoginResponse): void {
    const token = response.access_token;
    const tokenType = response.token_type;

    // Store in cookies (expires in 24 hours)
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 24);
    document.cookie = `${this.tokenKey}=${token}; path=/; expires=${expirationDate.toUTCString()}; SameSite=Strict`;
    document.cookie = `${this.tokenTypeKey}=${tokenType}; path=/; expires=${expirationDate.toUTCString()}; SameSite=Strict`;

    // Also store in localStorage for easier access
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.tokenTypeKey, tokenType);
  }

  /**
   * Retrieve token from storage
   * @returns Access token or null
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Retrieve token type from storage
   * @returns Token type or null
   */
  getTokenType(): string | null {
    return localStorage.getItem(this.tokenTypeKey);
  }

  /**
   * Check if user is authenticated
   * @returns true if token exists
   */
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  /**
   * Clear token from cookies and localStorage (logout)
   */
  clearToken(): void {
    // Clear localStorage
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.tokenTypeKey);

    // Clear cookies by setting expiration to past date
    document.cookie = `${this.tokenKey}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Strict`;
    document.cookie = `${this.tokenTypeKey}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Strict`;
  }
}
