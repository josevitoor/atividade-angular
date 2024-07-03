import { Routes } from '@angular/router';
import { FormProdutosComponent } from './produtos/form-produtos/form-produtos.component';

export const routes: Routes = [
  {
    path: 'produtos',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./produtos/lista-produtos/lista-produtos.component').then(
            (m) => m.ListaProdutosComponent
          ),
      },
      { path: 'new', component: FormProdutosComponent },
      { path: ':id/edit', component: FormProdutosComponent },
    ],
  },
];
