import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Recipes }   from './components/Recipes.View.component/Recipes.View.component';
import { ManageRecipeView } from './components/ManageRecipes.View.component/ManageRecipes.View.component';

const routes: Routes = [
  { path: '', redirectTo: '/RecipesView', pathMatch: 'full' },
  { path: 'RecipesView',  component: Recipes },
  { path: 'ManageRecipesView',  component: ManageRecipeView }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
