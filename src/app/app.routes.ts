import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LivreComponent } from './components/livre/livre.component';
import { AjouterLivreComponent } from './components/ajouter-livre/ajouter-livre.component';
import { ModifierLivreComponent } from './components/modifier-livre/modifier-livre.component';
import { LivreDetailsComponent } from './components/livre-details/livre-details.component';

export const routes: Routes = [

  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'livre',
    component: LivreComponent
  },
  {
    path: 'livre/add',
    component: AjouterLivreComponent
  },
  {
  path: 'livre/edit/:id',
  component: ModifierLivreComponent
},
{
  path: 'livre/:id',
  component: LivreDetailsComponent
}
];
