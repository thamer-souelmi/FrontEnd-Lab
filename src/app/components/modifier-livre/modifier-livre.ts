import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LivreService } from '../../core/services/livre-service';
import { LivreModel } from '../../core/Models/livres-models';
@Component({
  selector: 'app-modifier-livre',
  imports: [FormsModule, CommonModule],
  templateUrl: './modifier-livre.html',
  styleUrl: './modifier-livre.css',
})
export class ModifierLivre implements OnInit {

  id = '';

  titre = '';
  auteur = '';
  annee?: number;
  isbn = '';

  loading = false;

  constructor(
    private route: ActivatedRoute,
    private bookService: LivreService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;

    this.loadBook();
    console.log('Book ID from route:', this.id); // Debugging log
  }

  loadBook() {
    this.loading = true;

    this.bookService.getOneLivres(this.id).subscribe({
      next: (book) => {
        this.titre = book.titre;
        this.auteur = book.auteur;
        this.annee = book.annee;
        this.isbn = book.isbn ?? '';
        this.loading = false;
        this.cdr.detectChanges();
        console.log('Book loaded:', book); // Debugging log
      },
      error: (err) => {
        console.log('Error loading book:', err); // Debugging log
        console.error(err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  updateBook() {
    this.loading = true;

    const updated: LivreModel = {
      _id: this.id,
      titre: this.titre,
      auteur: this.auteur,
      annee: this.annee,
      isbn: this.isbn
    };

    this.bookService.updateLivre(this.id, updated).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/livre']);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}