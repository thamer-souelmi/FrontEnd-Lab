export interface LivreModel {
  _id: string;
  titre: string;
  auteur: string;
  annee?: number;
  isbn?: string;
}
export interface BookResponse {
  total: number;
  results: LivreModel[];
}