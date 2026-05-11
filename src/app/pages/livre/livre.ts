import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LivreModule } from '../../core/Modules/livresModule';
import { LivreService } from '../../core/services/livreService';
import { CommonModule } from '@angular/common';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-livre',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './livre.html',
  styleUrl: './livre.css',
})
export class Livre implements OnInit {

  books: LivreModule[] = [];
  loading = false;

  constructor(private bookService: LivreService,private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

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

viewBook(book: LivreModule) {
  console.log('Viewing book:', book); // Debugging log
  this.router.navigate(['/livre', book._id]);
}

editBook(book: LivreModule) {
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