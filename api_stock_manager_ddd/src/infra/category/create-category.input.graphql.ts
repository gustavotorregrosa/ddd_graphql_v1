import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCategoryInputType {

    @Field()
    name: string

    @Field({ nullable: true })
    description?: string

}