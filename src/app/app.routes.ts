import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Livre } from './pages/livre/livre';
import { AjouterLivre } from './pages/ajouter-livre/ajouter-livre';
import { ModifierLivre } from './pages/modifier-livre/modifier-livre';
import { LivreDetails } from './pages/livre-details/livre-details';

export const routes: Routes = [

  {
    path: '',
    component: Login
  },
  {
    path: 'livre',
    component: Livre
  },
  {
    path: 'livre/add',
    component: AjouterLivre
  },
  {
  path: 'livre/edit/:id',
  component: ModifierLivre
},
{
  path: 'livre/:id',
  component: LivreDetails
}
];
