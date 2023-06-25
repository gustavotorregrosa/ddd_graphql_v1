import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class EditCategoryInputType {

    @Field()
    id: string

    @Field()
    name: string

    @Field({ nullable: true })
    description?: string

}