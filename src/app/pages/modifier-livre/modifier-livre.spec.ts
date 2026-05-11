import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierLivre } from './modifier-livre';

describe('ModifierLivre', () => {
  let component: ModifierLivre;
  let fixture: ComponentFixture<ModifierLivre>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierLivre],
    }).compileComponents();

    fixture = TestBed.createComponent(ModifierLivre);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
