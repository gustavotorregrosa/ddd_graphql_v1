import { IRepository } from "src/@core/shared/repository.interface";
import { ICategory } from "./domain.interface";
import { IService } from "../../shared/service.interface";
import { IHasProduct } from "../product/has-product.interface";
import { IProduct } from "../product/domain.interface";
import { Category } from "./domain.class";
import { Product } from "../product/domain.class";

export class CategoryService implements IHasProduct, IService<ICategory> {

    constructor(private categoryRepository: IRepository<ICategory>, private productRepository: IRepository<IProduct>){}

    async getAllProducts(category: ICategory): Promise<IProduct[]> {
        return (await this.productRepository.getAll()).filter(c => c.category_id == category.id)
    }

    async attachProduct(category: ICategory, product: IProduct): Promise<IProduct>{
        const newProduct: IProduct = product
        newProduct.category_id = category.id
        await this.productRepository.save(newProduct)
        return newProduct
    }

    async getAll(): Promise<ICategory[]> {
        const categories: ICategory[] = [];
        const allCategories: ICategory[] = await this.categoryRepository.getAll()
        const allProducts: IProduct[] = await this.productRepository.getAll()

        allCategories.map(cat => {
            const categoryWithProducts: ICategory = new Category(cat.id, cat.name, cat.description)
            allProducts.map(prd => {
                if(prd.category_id == cat.id){
                    categoryWithProducts.attachProduct(new Product(prd.id, prd.name, prd.description, cat.id))
                }
            })

            categories.push(categoryWithProducts)
        })
        return categories

    }

    async findOneById(id: string): Promise<ICategory> {
        return (await this.getAll()).find(c => c.id == id)
        // return await this.categoryRepository.findOneById(id)
    }

    async createOne(data: Omit<ICategory, "id">): Promise<ICategory> {
        return await this.categoryRepository.createOne(data)
    }

    async save(data: ICategory): Promise<ICategory> {
        return await this.categoryRepository.save(data)
    }

    async deleteById(id: string): Promise<ICategory> {
        return await this.categoryRepository.deleteById(id)
    }

}