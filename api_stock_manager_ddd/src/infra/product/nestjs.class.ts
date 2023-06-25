import { Field, ObjectType } from "@nestjs/graphql";
import { Product } from "src/@core/domain/product/domain.class";

@ObjectType()
export class ProductInfra extends Product{

    @Field()
    public id: string

    @Field()
    public name: string

    @Field()
    public description: string

    @Field()
    public category_id: string

}