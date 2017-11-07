import { Component, Output, Input, EventEmitter, OnInit  } from '@angular/core';
import { recipe } from 'app/components/Shared/recipe.model';
import {RecipesService} from 'app/recipes.service'
import { CurrencyPipe } from '@angular/common';

@Component({
    selector: 'my-recipe-list',
    templateUrl: './recipeList.component.html',
    styleUrls: ['./recipeList.component.css'],
})

export class recipeList{
    isMouseEnter = false;
    listItemStyle:any;
    listItemClass:any;
    @Input() myRecipeList: any;
    @Output() change = new EventEmitter<recipe>();

    onClick (recipe){
      this.change.emit(recipe);
  }
    setStyle(){
        this.listItemClass = 'myStyle';
        
        if(this.isMouseEnter){
            this.listItemStyle =  {
            '-webkit-transition': 'all 1s',
            '-moz-transition': 'all 1s',
            '-o-transition': 'all 1s',
            'transition': 'all 1s',
            }
        }else{
            this.listItemClass = null;
            this.listItemStyle =  null;
        }
    }

    mouseEnter(){
        this.isMouseEnter = true;
        this.setStyle();
    }
    mouseLeave(){
        this.isMouseEnter = false;
        this.setStyle();
    }
}