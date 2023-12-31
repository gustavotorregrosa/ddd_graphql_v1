import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateProductInputType {

    @Field()
    name: string

    @Field({ nullable: true })
    description?: string

    @Field({ nullable: true })
    category_id?: string

}