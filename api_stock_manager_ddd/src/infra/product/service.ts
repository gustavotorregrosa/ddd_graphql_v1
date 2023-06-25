import { Injectable } from "@nestjs/common";
import { IService } from "src/@core/shared/service.interface";
import { ProductService as DomainService } from "src/@core/domain/product/service";
import { ProductRepository } from "./repository";
import { IProduct } from "src/@core/domain/product/domain.interface";

@Injectable()
export class ProductService implements IService<IProduct> {

    domainService: IService<IProduct>

    constructor(private prodRepo: ProductRepository){
            this.domainService = new DomainService(prodRepo)
    }

    async getAll(): Promise<IProduct[]> {
        return await this.domainService.getAll()
    }

    async findOneById(id: string): Promise<IProduct> {
        return await this.domainService.findOneById(id)
    }

    async createOne(data: Omit<IProduct, "id">): Promise<IProduct> {
        return await this.domainService.createOne(data)
    }
    
    async save(data: IProduct): Promise<IProduct>{
        return await this.domainService.save(data)
    }

    async deleteById(id: string): Promise<IProduct>{
        return await this.domainService.deleteById(id)
    }

}