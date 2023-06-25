import { Product } from "../product/domain.class";
import { ICategory } from "./domain.interface";

export class Category implements ICategory {
    
    public products: Product[] = []
    
    constructor(public id: string, public name: string, public description: string){}

    public attachProduct = (product: Product) => this.products.push(product)

}