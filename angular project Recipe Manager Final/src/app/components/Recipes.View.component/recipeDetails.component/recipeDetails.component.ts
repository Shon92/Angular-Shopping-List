import { Component, Input,Output, EventEmitter, OnInit } from '@angular/core';
import {recipe} from 'app/components/Shared/recipe.model';


@Component({
  selector: 'my-recipe-details',
  templateUrl: './recipeDetails.component.html',
    styleUrls: ['./recipeDetails.component.css'],
})
export class recipeDetails implements OnInit {
@Input() shownRecipe:recipe;
@Output() addToCart = new EventEmitter<recipe>();
@Output() editRecipe = new EventEmitter<recipe>();

  onAddToCartClick(recipe){
    this.addToCart.emit(recipe);
  }

  onEditClick(recipe){
    this.editRecipe.emit(recipe);
  }
  
  ngOnInit(): void {
  }
}