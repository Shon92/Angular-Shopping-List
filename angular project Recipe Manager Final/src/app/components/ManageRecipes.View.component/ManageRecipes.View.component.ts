import { Component, Output, Input, OnInit, EventEmitter } from '@angular/core';
import { ManageRecipe } from './MngRecipeIngredients.component/MngRecipeIngredients.component';
import {recipe} from 'app/components/Shared/recipe.model';
import { Ingredient } from 'app/components/Shared/Ingredient.model';
import {RecipesService} from 'app/recipes.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OnlyNumber } from 'app/components/CustomDirectives/numberOnly';
import {Router} from '@angular/router';
@Component({
    selector: 'manage-recipes',
    templateUrl: './ManageRecipes.View.component.html'
})

export class ManageRecipeView implements OnInit{
    form = new FormGroup({
        'recipename': new FormControl('', Validators.required),
        'recipedesc': new FormControl('', Validators.required),
        'recipeprice': new FormControl('', Validators.required),
        'recipeimageurl': new FormControl()
    });

    // properties:

    get recipename(){
        return this.form.get('recipename');
    }
    get recipedesc(){
        return this.form.get('recipedesc');
    }
    get recipeprice(){
        return this.form.get('recipeprice');
    }

    // fields:

    recipeName:string;
    recipeDesc:string;
    recipePrice:number;
    recipeImageUrl:Object;
    @Output() newRecipe:recipe;
    newIngredientList:Ingredient[];
    // Initializers:

    constructor(private recipes: RecipesService, private router:Router) {
    }
    ngOnInit(): void {  
    }

    // Functions:

    onIngredientChange(ingredientList){
        this.newIngredientList = ingredientList;
    }

    submitNewRecipe(){
        if (this.recipename.invalid || this.recipedesc.invalid || this.recipeprice.invalid)
        {
            this.form.setErrors({
                invalidSubmit : true
            });
        } 
        else
        {
            if (this.recipeImageUrl == undefined || this.recipeImageUrl == null){
             this.recipeImageUrl = "http://galenaguide.com/wp-content/uploads/2013/04/food-icon.png";
             let myNewRecipe = new recipe(this.recipeName, this.recipeDesc, this.recipePrice, this.recipeImageUrl.toString(), this.newIngredientList);
             myNewRecipe.id = this.recipes.counter++;
             this.recipes.addRecipeItem(myNewRecipe);
             this.router.navigateByUrl('/RecipesView')
            }else{
              let myNewRecipe = new recipe(this.recipeName, this.recipeDesc, this.recipePrice, this.recipeImageUrl.toString(), this.newIngredientList);
              myNewRecipe.id = this.recipes.counter++;
              this.recipes.addRecipeItem(myNewRecipe);
              this.router.navigateByUrl('/RecipesView');
            }
        }
    }
}