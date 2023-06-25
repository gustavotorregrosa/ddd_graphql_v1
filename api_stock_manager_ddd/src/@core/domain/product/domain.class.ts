import { IProduct } from "./domain.interface";

export class Product implements IProduct {
    constructor(public id: string, public name: string, public description: string, public category_id: string ){}
}