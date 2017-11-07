// Angular && External imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// My component imports
import { AppComponent } from './components/app.component/app.component';
import { AppRoutingModule } from './app.routing';
import { Navbar } from './components/Navbar/navbar.component';
import { Recipes } from './components/Recipes.View.component/Recipes.View.component';
import { recipeList } from 'app/components/Recipes.View.component/recipeList.component/recipeList.component';
import { recipeDetails } from 'app/components/Recipes.View.component/recipeDetails.component/recipeDetails.component';
import { ManageRecipeView } from './components/ManageRecipes.View.component/ManageRecipes.View.component';
import {ManageRecipe} from './components/ManageRecipes.View.component/MngRecipeIngredients.component/MngRecipeIngredients.component';
import {RecipesService} from 'app/recipes.service';
import { OnlyNumber } from './components/CustomDirectives/numberOnly';
import { editRecipe } from 'app/components/Recipes.View.component/recipeEdit.component/recipeEdit.component';

@NgModule({
  declarations: [
    AppComponent,
    Navbar,
    Recipes,
    recipeList,
    recipeDetails,
    ManageRecipeView,
    ManageRecipe,
    OnlyNumber,
    editRecipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [RecipesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
