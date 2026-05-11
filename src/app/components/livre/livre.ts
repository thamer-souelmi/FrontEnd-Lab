import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { LivreModel } from '../../core/Models/livres-models';
import { LivreService } from '../../core/services/livre-service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-livre',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './livre.html',
  styleUrl: './livre.css',
})
export class Livre implements OnInit {

  books: LivreModel[] = [];
  loading = false;

  private router= inject(Router);
  private bookService = inject(LivreService);
  private cdr = inject(ChangeDetectorRef);


  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks() {
    this.loading = true;

    this.bookService.getAllLivres().subscribe({
      next: (res) => {
        this.books = res.results;
        this.loading = false;
        console.log('Books loaded:', this.books); // Debugging log
        console.log('Total books:', res.total); // Debugging log
        console.log('API loading:', this.loading); // Debugging log
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
  addBook() {
  this.router.navigate(['/livre/add']);
}

viewBook(book: LivreModel) {
  console.log('Viewing book:', book); // Debugging log
  this.router.navigate(['/livre', book._id]);
}

editBook(book: LivreModel) {
  this.router.navigate(['/livre/edit', book._id]);
}

deleteBook(id: string) {
  if (confirm('Are you sure you want to delete this book?')) {
    console.log('Deleting book with ID:', id); // Debugging log
    this.bookService.deleteLivre(id).subscribe(() => {
      this.loadBooks(); // refresh list
    }
  )
  ;
  }
}


logout() {
  localStorage.clear();
  this.router.navigate(['']);
}
}