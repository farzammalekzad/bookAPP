import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchPage } from './search.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: SearchPage,
    children: [
      {
        path: 'discover',
        loadChildren: () => import('./discover/discover.module').then( m => m.DiscoverPageModule)
      },
      {
        path: 'user',
        loadChildren: () => import('./user/user.module').then( m => m.UserPageModule)
      },
      {
        path: 'about',
        loadChildren: () => import('./about/about.module').then( m => m.AboutPageModule)
      },
      {
        path: 'list',
        loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchPageRoutingModule {}
