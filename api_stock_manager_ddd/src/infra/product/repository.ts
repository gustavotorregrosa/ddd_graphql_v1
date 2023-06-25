import { ICategory } from "src/@core/domain/category/domain.interface";
import { IRepository } from "src/@core/shared/repository.interface";
import {promises as fs} from 'fs'
import { randomUUID } from "crypto";
import { Injectable } from "@nestjs/common";
import { IProduct } from "src/@core/domain/product/domain.interface";

const path: string = __dirname + '/db.json'
const {readFile, writeFile} = fs

@Injectable()
export class ProductRepository implements IRepository<IProduct> {
    
    async getAll(): Promise<IProduct[]> {
        return await this.readAllData()
    }

    async findOneById(id: string): Promise<IProduct> {
        return (await this.readAllData()).find(prd => prd.id == id)
    }

    async deleteById(id: string): Promise<IProduct>{
        const product = await this.findOneById(id)
        const data = (await this.readAllData()).filter(c => c.id != product.id)
        this.saveData(data)
        return product
    }

    async createOne(data: Omit<IProduct, "id">): Promise<IProduct> {  
        const _data: IProduct = {
            ...data,
            id: randomUUID()
        }

        const allData = await this.readAllData()
        allData.push(_data)
        await this.saveData(allData)
        return _data
    }

    async save(data: IProduct): Promise<IProduct> {

        let productList: IProduct[] = []
        const oldProductList = await this.readAllData()
        oldProductList.map(prd => {
            let _prd = prd
            if(prd.id == data.id){
                _prd = {
                    ..._prd,
                    ...data
                }
            }

            productList.push(_prd)
        })

        await this.saveData(productList)
        return data
    }

    private async readAllData(): Promise<IProduct[]> {
        try {
            const data: string = await readFile(path, 'utf-8')
            return JSON.parse(data) as IProduct[]
        } catch(e){
            await this.saveData([])
            return this.readAllData()
        }
       
    }

    private async saveData(data: IProduct[]): Promise<IProduct[]> {
        await writeFile(path, JSON.stringify(data), 'utf8')
        return data
    }
    
}