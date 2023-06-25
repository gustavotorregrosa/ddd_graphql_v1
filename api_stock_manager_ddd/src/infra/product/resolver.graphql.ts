import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ProductInfra } from "./nestjs.class";
import { CreateProductInputType } from "./create-product.input.graphql";
import { EditProductInputType } from "./edit-product.input.graphql";
import { ProductService } from "./service";
import { DeleteProductInputType } from "./delete-product.input.graphql";
import { CategoryService } from "../category/service";


@Resolver()
export class ProductResolver {

    constructor(private service: ProductService, private categoryService: CategoryService){}

    @Query(returns => [ProductInfra])
    async getAllProducts(){
        return await this.service.getAll()
    }

    @Query(returns => ProductInfra)
    async getOneProduct(@Args('id') id: string){
        return await this.service.findOneById(id)
    }

    @Mutation(returns => ProductInfra)
    async createProduct(@Args('product') product: CreateProductInputType){
        return await this.service.createOne(new ProductInfra('', product.name, product.description, product.category_id))
    }

    @Mutation(returns => ProductInfra)
    async editProduct(@Args('product') product: EditProductInputType){
        return await this.service.save(new ProductInfra(product.id, product.name, product.description, product.category_id))
    }

    @Mutation(returns => ProductInfra)
    async deleteProduct(@Args('product') product: DeleteProductInputType){
        return await this.service.deleteById(product.id)
    }

    @Mutation(returns => ProductInfra)
    async attachProductToCategory(@Args('product') product: EditProductInputType){
        const _category = await this.categoryService.findOneById(product.category_id)
        const _product = await this.service.findOneById(product.id)
        return await this.categoryService.attachProduct(_category, _product) 
    }
}