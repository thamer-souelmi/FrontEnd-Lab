import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BookResponse, LivreModel } from "../models/livres-models";
import { LivreAPI } from "../api/livre.api";

@Injectable({
  providedIn: 'root',
})
export class LivreService {

  private livreApi = inject(LivreAPI);

  getAllLivres(): Observable<BookResponse> {
    return this.livreApi.getLivres();
  }
    getOneLivres(id: string): Observable<LivreModel> {
        return this.livreApi.getOneLivres(id);
    }
  addLivre(livre: LivreModel): Observable<LivreModel> {
    return this.livreApi.addLivre(livre);
  }
    updateLivre(id: string, livre: any): Observable<any> {
        return this.livreApi.updateLivre(id, livre);
    }
  deleteLivre(id: string): Observable<void> {
    return this.livreApi.deleteLivre(id);
  }
}