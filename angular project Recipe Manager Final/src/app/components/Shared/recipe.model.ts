import {Ingredient} from './Ingredient.model'
export class recipe{
    id:number;
    constructor(public name:string, public shortDesc:string,
                public price:number, public imageUrl:string, 
                public ingredient:Ingredient[]){
}
}
