import { ICategory } from "../category/domain.interface";
import { IProduct } from "./domain.interface";

export interface IHasProduct {

    getAllProducts: (category: ICategory) => Promise<IProduct[]>
    
    attachProduct: (category: ICategory, product: IProduct) => Promise<IProduct>

}