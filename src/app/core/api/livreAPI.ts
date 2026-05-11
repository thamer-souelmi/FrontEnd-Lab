import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthAPI } from './authAPI';

import { BookResponse, LivreModule } from '../Modules/livresModule';

@Injectable({
  providedIn: 'root',
})
export class LivreAPI {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private authAPI: AuthAPI
  ) {}
//to api livre api
  /**
   * Get HTTP headers with authentication token
   * @returns HttpHeaders with Authorization bearer token
   */
  private getHeaders(): HttpHeaders {
    const token = this.authAPI.getToken();
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }

  /**
   * Fetch list of books from API
   * @returns Observable of book array
   */
  getLivres(): Observable<BookResponse> {
    return this.http.get<BookResponse>(`${this.apiUrl}/livres`, {
      headers: this.getHeaders()
    });
  }
  getOneLivres(id: string): Observable<LivreModule> {
    return this.http.get<LivreModule>(`${this.apiUrl}/livres/${id}`, {
      headers: this.getHeaders()
    });
  }
  /**
   * Add a new book
   * @param livre Book data to add
   * @returns Observable of added book
   */
  addLivre(livre: LivreModule): Observable<LivreModule> {
    return this.http.post<LivreModule>(`${this.apiUrl}/livres`, livre, {
      headers: this.getHeaders()
    });
  }
  updateLivre(id: string, livre: LivreModule): Observable<LivreModule> {
    return this.http.put<LivreModule>(`${this.apiUrl}/livres/${id}`, livre, {
      headers: this.getHeaders()
    });
  }

  /**
   * Delete a book by ID
   * @param id ID of the book to delete
   * @returns Observable of delete response
   */
deleteLivre(id: string): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/livres/${id}`, {
    headers: this.getHeaders()
  });
}
}
