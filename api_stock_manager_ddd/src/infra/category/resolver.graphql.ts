import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CategoryInfra } from "./nestjs.class";
import { CreateCategoryInputType } from "./create-category.input.graphql";
import { EditCategoryInputType } from "./edit-category.input.graphql";
import { CategoryService } from "./service";
import { DeleteCategoryInputType } from "./delete-category.input.graphql";
import { ProductInfra } from "../product/nestjs.class";

@Resolver()
export class CategoryResolver {

    constructor(private service: CategoryService){}

    @Query(returns => [CategoryInfra])
    async getAllCategories(){
        return await this.service.getAll()
    }

    @Query(returns => CategoryInfra)
    async getOneCategory(@Args('id') id: string){
        return await this.service.findOneById(id)
    }

    @Mutation(returns => CategoryInfra)
    async createCategory(@Args('category') category: CreateCategoryInputType){
        return await this.service.createOne(new CategoryInfra('', category.name, category.description))
    }

    @Mutation(returns => CategoryInfra)
    async editCategory(@Args('category') category: EditCategoryInputType){
        return await this.service.save(new CategoryInfra(category.id, category.name, category.description))
    }

    @Mutation(returns => CategoryInfra)
    async deleteCategory(@Args('category') category: DeleteCategoryInputType){
        return await this.service.deleteById(category.id)
    }

    @Mutation(returns => [ProductInfra])
    async getProducts(@Args('id') id: string){
        const _category = await this.service.findOneById(id)
        return await this.service.getAllProducts(_category)
    }

}