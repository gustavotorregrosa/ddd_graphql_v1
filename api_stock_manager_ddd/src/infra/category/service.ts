import { Injectable } from "@nestjs/common";
import { ICategory } from "src/@core/domain/category/domain.interface";
import { IService } from "src/@core/shared/service.interface";
import { CategoryService as DomainService } from "src/@core/domain/category/service";
import { CategoryRepository } from "./repository";
import { ProductRepository } from "../product/repository";
import { IHasProduct } from "src/@core/domain/product/has-product.interface";
import { IProduct } from "src/@core/domain/product/domain.interface";

@Injectable()
export class CategoryService implements IService<ICategory>, IHasProduct {

    domainService: DomainService

    constructor(private catRepo: CategoryRepository, private prdRepo: ProductRepository){
            this.domainService = new DomainService(catRepo, prdRepo)
    }
    
    async getAllProducts(category: ICategory): Promise<IProduct[]> {
        return await this.domainService.getAllProducts(category)
    }

    async attachProduct(category: ICategory, product: IProduct): Promise<IProduct>{
        return await this.domainService.attachProduct(category, product)
    }

    async getAll(): Promise<ICategory[]> {
        return await this.domainService.getAll()
    }

    async findOneById(id: string): Promise<ICategory> {
        return await this.domainService.findOneById(id)
    }

    async createOne(data: Omit<ICategory, "id">): Promise<ICategory> {
        return await this.domainService.createOne(data)
    }
    
    async save(data: ICategory): Promise<ICategory>{
        return await this.domainService.save(data)
    }

    async deleteById(id: string): Promise<ICategory>{
        return await this.domainService.deleteById(id)
    }

}