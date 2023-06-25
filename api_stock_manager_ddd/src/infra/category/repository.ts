import { ICategory } from "src/@core/domain/category/domain.interface";
import { IRepository } from "src/@core/shared/repository.interface";
import {promises as fs} from 'fs'
import { randomUUID } from "crypto";
import { Injectable } from "@nestjs/common";

const path: string = __dirname + '/db.json'
const {readFile, writeFile} = fs

@Injectable()
export class CategoryRepository implements IRepository<ICategory> {
    
    async getAll(): Promise<ICategory[]> {
        return await this.readAllData()
    }

    async findOneById(id: string): Promise<ICategory> {
        return (await this.readAllData()).find(cat => cat.id == id)
    }

    async deleteById(id: string): Promise<ICategory>{
        const category = await this.findOneById(id)
        const data = (await this.readAllData()).filter(c => c.id != category.id)
        this.saveData(data)
        return category
    }

    async createOne(data: Omit<ICategory, "id">): Promise<ICategory> {  
        const _data: ICategory = {
            ...data,
            id: randomUUID()
        }

        const allData = await this.readAllData()
        allData.push(_data)
        await this.saveData(allData)
        return _data
    }

    async save(data: ICategory): Promise<ICategory> {

        let categoryList: ICategory[] = []
        const oldCategoryList = await this.readAllData()
        oldCategoryList.map(cat => {
            let _cat = cat
            if(cat.id == data.id){
                _cat = {
                    ..._cat,
                    ...data
                }
            }

            categoryList.push(_cat)
        })

        await this.saveData(categoryList)
        return data
    }

    private async readAllData(): Promise<ICategory[]> {
        try {
            const data: string = await readFile(path, 'utf-8')
            return JSON.parse(data) as ICategory[]
        } catch(e){
            await this.saveData([])
            return this.readAllData()
        }
       
    }

    private async saveData(data: ICategory[]): Promise<ICategory[]> {
        await writeFile(path, JSON.stringify(data), 'utf8')
        return data
    }
    
}