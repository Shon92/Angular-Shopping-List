import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { recipeList } from 'app/components/Recipes.View.component/recipeList.component/recipeList.component';
import { recipeDetails } from 'app/components/Recipes.View.component/recipeDetails.component/recipeDetails.component';
import {recipe} from 'app/components/Shared/recipe.model';
import {RecipesService} from 'app/recipes.service';

@Component({
    selector: 'Recipes',
    templateUrl: './Recipes.View.component.html'
})

export class Recipes implements OnInit{
    @Output() selectedRecipe: recipe;
    @Output() selectedRecipeToEdit: recipe;
    @Output() recipeList:any;
    recipeDetailsExpose:boolean;
    recipeEditExpose:boolean;

    constructor(private recipes: RecipesService) {}
    
    ngOnInit(): void {
        this.recipes.recipeListUpdated.subscribe(
            () => {
                this.recipeList=this.recipes.getRecipeList();
            }
        );
        this.recipeList = this.recipes.getRecipeList();
        this.recipeDetailsExpose = false;
        this.recipeEditExpose = false;
    }

    onRecipeChanged(recipe){
        this.recipeEditExpose = false;
        this.recipeDetailsExpose = true;
        this.selectedRecipe = recipe;
        
    }

    onRecipeToCart(recipe){
        let index = this.recipeList.findIndex((rec) => (rec===recipe));
        if (index != -1) {
        //this.recipeList.splice(index, 1);
        this.recipes.removeRecipeItem(index);
        this.recipeDetailsExpose = false;
        }
    }

    onRecipeEdit(recipe){
        // when a user clicks the Edit button inside the details component,
        // it should show the user the edit component with the contex.

        this.recipes.edit.emit(recipe);
        this.recipeEditExpose = true;
        this.selectedRecipeToEdit = recipe;
        //this.recipes.editRecipeItem(recipe);
    }

    onRecipeSaveChanges(editedRecipe){
        this.recipes.editSaveChanges(editedRecipe);
        this.recipeEditExpose = false;
    }
}