import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LivreService } from '../../core/services/livre-service';
import { LivreModel } from '../../core/models/livres-models';
@Component({
  selector: 'app-livre-details',
  imports: [],
  templateUrl: './livre-details.html',
  styleUrl: './livre-details.css',
})
export class LivreDetailsComponent implements OnInit {

  book: LivreModel | null = null;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private bookService: LivreService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.loadBook(id);
  }

  loadBook(id: string) {
    this.loading = true;

    this.bookService.getOneLivres(id).subscribe({
      next: (res) => {
        this.book = res;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}
