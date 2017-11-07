import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  EventEmitter,
  Output
} from '@angular/core';

import { Ingredient } from 'app/components/Shared/Ingredient.model';
import { recipe } from 'app/components/Shared/recipe.model';
import { OnlyNumber } from 'app/components/CustomDirectives/numberOnly';

@Component({
  selector: 'Manage-Recipe-add',
  templateUrl: './MngRecipeIngredients.component.html',
})
export class ManageRecipe implements OnInit {
    newRecipe:recipe;
    ingredientList:Ingredient[];
    name:string;
    amount:number;
    @Output() myEvent = new EventEmitter<Ingredient[]>();

   constructor() { 
     this.ingredientList = new Array();
   }

  ngOnInit() {
  }

  onAddItem() {
    let newIngredient = new Ingredient(this.name, this.amount);
    this.ingredientList.push(newIngredient);
    this.myEvent.emit(this.ingredientList);
  }

  removeIngredient(Ingredient){
         let index = this.ingredientList.findIndex(ing => ing === Ingredient);
         this.ingredientList.splice(index,1);
    }

  onClearList(){
    this.ingredientList = new Array();
  }

}
