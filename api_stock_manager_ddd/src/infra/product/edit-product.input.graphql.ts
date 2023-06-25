import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class EditProductInputType {

    @Field()
    id: string

    @Field()
    name: string

    @Field({ nullable: true })
    description?: string

    @Field({ nullable: true })
    category_id?: string

}