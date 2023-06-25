import { Field, ObjectType } from "@nestjs/graphql";
import { Category } from "src/@core/domain/category/domain.class";
import { ProductInfra } from "../product/nestjs.class";
import { Product } from "src/@core/domain/product/domain.class";

@ObjectType()
export class CategoryInfra extends Category{

    @Field()
    public id: string

    @Field()
    public name: string

    @Field()
    public description: string

    @Field(type => [ProductInfra], {nullable: true})
    public products: Product[]

}