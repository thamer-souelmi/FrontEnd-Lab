import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BookResponse, LivreModule } from "../Modules/livresModule";
import { LivreAPI } from "../api/livreAPI";

@Injectable({
  providedIn: 'root',
})
export class LivreService {

  constructor(private livreApi: LivreAPI) {}

  getAllLivres(): Observable<BookResponse> {
    return this.livreApi.getLivres();
  }
    getOneLivres(id: string): Observable<LivreModule> {
        return this.livreApi.getOneLivres(id);
    }
  addLivre(livre: LivreModule): Observable<LivreModule> {
    console.log('Adding book service:', livre); // Debugging log
    return this.livreApi.addLivre(livre);
  }
    updateLivre(id: string, livre: any): Observable<any> {
        return this.livreApi.updateLivre(id, livre);
    }
  deleteLivre(id: string): Observable<void> {
    return this.livreApi.deleteLivre(id);
  }
}