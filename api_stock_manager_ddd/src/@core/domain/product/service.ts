import { IRepository } from "src/@core/shared/repository.interface";
import { IProduct } from "./domain.interface";
import { IService } from "../../shared/service.interface";

export class ProductService implements IService<IProduct>{

    constructor(public repository: IRepository<IProduct>){}

    async getAll(): Promise<IProduct[]> {
        return await this.repository.getAll()
    }

    async findOneById(id: string): Promise<IProduct> {
        return await this.repository.findOneById(id)
    }

    async createOne(data: Omit<IProduct, "id">): Promise<IProduct> {
        return await this.repository.createOne(data)
    }

    async save(data: IProduct): Promise<IProduct> {
        return await this.repository.save(data)
    }

    async deleteById(id: string): Promise<IProduct> {
        return await this.repository.deleteById(id)
    }

}   