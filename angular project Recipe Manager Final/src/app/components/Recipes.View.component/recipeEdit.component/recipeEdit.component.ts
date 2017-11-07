import { Component, Input,Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import {recipe} from 'app/components/Shared/recipe.model';
import {RecipesService} from 'app/recipes.service';
import { Ingredient } from 'app/components/Shared/Ingredient.model';

@Component({
  selector: 'edit-recipe',
  templateUrl: './recipeEdit.component.html'
})
export class editRecipe implements OnInit, OnDestroy {
@Input() editedRecipe:recipe;

recipeIngredients:Ingredient[];
newIngName:string;
newIngAmount:number;
savedChanges:boolean;

@Output() editSaveChanges = new EventEmitter<any>();

constructor(private recipes : RecipesService) { 
    this.recipeIngredients = new Array;
    this.savedChanges=false;
}

    ngOnInit(): void {
         this.recipes.edit.subscribe(
            (recipeToEdit) => {
                this.onEditRequest(recipeToEdit);
            }
        );
        this.recipeIngredients = this.editedRecipe.ingredient;
        this.savedChanges=false;
  }

    onEditRequest(recipeToEdit){
        this.recipeIngredients = new Array;
        this.editedRecipe.ingredient.forEach(ingredient => {
        this.recipeIngredients.push(ingredient);
      });
    }

    onSaveChanges(){
        this.savedChanges = true;
        this.editSaveChanges.emit(this.editedRecipe);
    }

    removeIngredient(Ingredient){
         let index = this.recipeIngredients.findIndex(ing => ing === Ingredient);
         this.recipeIngredients.splice(index,1);
    }

    addIngredient(){
        if(this.newIngName != undefined && this.newIngAmount != undefined){
            let newIngredient = new Ingredient(this.newIngName, this.newIngAmount);
            this.recipeIngredients.push(newIngredient);
        }else{
            alert("Please fill the inputs before adding new ingredient");
        }
    }

    ngOnDestroy(){
        if(this.savedChanges){
        }else{
            this.recipes.recipeListUpdated.emit();
        }
        
  }
}