import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterLivre } from './ajouter-livre.component';

describe('AjouterLivre', () => {
  let component: AjouterLivre;
  let fixture: ComponentFixture<AjouterLivre>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterLivre],
    }).compileComponents();

    fixture = TestBed.createComponent(AjouterLivre);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
