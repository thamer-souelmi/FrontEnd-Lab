import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LivreService } from '../../core/services/livre-service';
import { LivreModel } from '../../core/Models/livres-models';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-ajouter-livre',
  imports: [FormsModule],
  templateUrl: './ajouter-livre.html',
  styleUrl: './ajouter-livre.css',
})
export class AjouterLivre { 

  titre = '';
  auteur = '';
  annee?: number;
  isbn = '';
  loading = false;
  errorMessage = '';

  private router = inject(Router); 
  private bookService = inject(LivreService);
  private cdr = inject(ChangeDetectorRef); 

  addBook() {

    if (!this.titre || !this.auteur) {
      this.errorMessage = 'Titre et auteur sont obligatoires';
      return;
    }

    this.loading = true;

    const book: LivreModel = {
      _id: '', 
  titre: this.titre,
  auteur: this.auteur,
  annee: this.annee,
  isbn: this.isbn
};

    this.bookService.addLivre(book).subscribe({
      
      next: () => {
        this.loading = false;
        this.cdr.detectChanges();
        this.router.navigate(['/livre']);
          
      },
      error: (err:HttpErrorResponse) => {
        console.error(err);
        this.loading = false;
        this.errorMessage = 'Erreur lors de l’ajout';
        this.cdr.detectChanges();
      }
    });
  }
}