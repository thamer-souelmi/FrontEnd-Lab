import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Livre } from './components/livre/livre';
import { AjouterLivre } from './components/ajouter-livre/ajouter-livre';
import { ModifierLivre } from './components/modifier-livre/modifier-livre';
import { LivreDetails } from './components/livre-details/livre-details';

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
