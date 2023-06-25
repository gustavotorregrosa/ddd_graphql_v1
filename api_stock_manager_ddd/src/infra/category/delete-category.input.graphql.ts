import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class DeleteCategoryInputType {

    @Field()
    id: string

}