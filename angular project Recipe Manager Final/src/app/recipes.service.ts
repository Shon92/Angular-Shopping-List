import { Injectable, EventEmitter, Output, OnInit } from '@angular/core';
import { recipe } from 'app/components/Shared/recipe.model';
import {Ingredient} from './components/Shared/Ingredient.model';
import {Router} from '@angular/router';

@Injectable()
export class RecipesService implements OnInit{

router: Router;
myRecipeList:recipe[];
saladIngredients:Ingredient[];
pastaIngredients:Ingredient[];
burgerIngredients:Ingredient[]; 
imageUrlFirst:string = "http://jonvilma.com/images/salad-5.jpg";
imageUrlSecond:string = "http://s1.1zoom.net/big3/969/336143-svetik.jpg";
imageUrlThird:string = "https://previews.123rf.com/images/rvlsoft/rvlsoft1211/rvlsoft121100009/16138750-Big-hamburger-on-white-background-Stock-Photo-hamburger-burger-cheeseburger.jpg";
recipeListUpdated:EventEmitter<recipe[]> = new EventEmitter<recipe[]>();
edit = new EventEmitter<recipe>();
counter:number = 0;

  constructor(_router: Router) {
    this.router = _router;

    // Checking if there is any local storage already in the browser
    if(localStorage.length != 0){ // Can be improved
      this.myRecipeList = JSON.parse(localStorage.getItem('recipeList'));
    } 
    else{
      this.initMockData();
    }
}
  ngOnInit() {
      this.myRecipeList = JSON.parse(localStorage.getItem('recipeList'));
  }

   // Initialize mock data if there isn't any in the local storage 

   initMockData(){
      
      this.saladIngredients = [new Ingredient('Tomato', 1), new Ingredient('Peppers', 5), new Ingredient('Cucumbers', 3)];
      this.pastaIngredients = [new Ingredient('Pasta pack', 1), new Ingredient('Tomato', 5), new Ingredient('Onions', 3)];
      this.burgerIngredients = [new Ingredient('Burger Beaf', 1), new Ingredient('Burger Bread',1), new Ingredient('Sauce', 1)];
      this.myRecipeList = [
      new recipe('Israeli Salad','The most delicious salad',30,this.imageUrlFirst, this.saladIngredients),
      new recipe('Pasta Arabiata', 'The most delicious Pasta',40, this.imageUrlSecond, this.pastaIngredients),
      new recipe('Burger', 'The most delicious Burger',25, this.imageUrlThird, this.burgerIngredients),
  ];
    this.myRecipeList.forEach(element => {
      element.id = this.counter;
      this.counter++;
    });
    localStorage.setItem('recipeList',JSON.stringify(this.myRecipeList));
   }

    addRecipeItem(recipe):void{
      this.myRecipeList.push(recipe);
      localStorage.setItem('recipeList',JSON.stringify(this.myRecipeList));
      this.recipeListUpdated.emit(this.myRecipeList);
    }

    editRecipeItem(recipe){
      let rcpEdit = this.myRecipeList.find(rcp => rcp.id == recipe.id);
      this.edit.emit(rcpEdit);
    }

    editSaveChanges(editedRecipe){
      let index = this.myRecipeList.findIndex(i => i.id == editedRecipe.id);
      this.myRecipeList.splice(index,1,editedRecipe);
      localStorage.setItem('recipeList',JSON.stringify(this.myRecipeList));
      this.recipeListUpdated.emit(this.myRecipeList);
    }

    removeRecipeItem(recIndex){
      this.myRecipeList.splice(recIndex, 1);
      localStorage.setItem('recipeList',JSON.stringify(this.myRecipeList));
      this.recipeListUpdated.emit(this.myRecipeList);
    }

    getRecipeList(): recipe[] {
      if(localStorage.length == 0){
        this.initMockData();
        return this.myRecipeList;
      }
      else{
        let myRecipeListLocalStorage = JSON.parse(localStorage.getItem('recipeList'));
        return myRecipeListLocalStorage;
    }
    }
}
