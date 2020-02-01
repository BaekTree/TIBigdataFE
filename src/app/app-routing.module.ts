import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    // component : MainContainerComponent
    loadChildren: () => import('./modules/homes/body/body.module').then(m => m.BodyModule)
  },
  // {
  //   path: '',
  //   loadChildren: () => import('./modules/homes/body/body.module').then(m => m.BodyModule)
  //   // homes.module').then(m => m.HomesModule)
  // },
  // {
  //   path: 'specials',
  //   loadChildren: () => import('./modules/homes/body/specials/specials.module').then(m => m.SpecialsModule)
  // },
  // {
  //   path: 'membership',
  //   loadChildren: () => import('./modules/core/core.module').then(m => m.CoreModule)
  // },
 
 

  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
