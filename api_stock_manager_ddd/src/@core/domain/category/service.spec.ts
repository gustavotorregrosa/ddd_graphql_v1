import { CategoryService } from "./service"
import { CategoryRepository } from "src/infra/category/repository"
import { ProductRepository } from "src/infra/product/repository"

describe('resolver',  () => {

    let categoryService: CategoryService
    let categoryRepository = new CategoryRepository()
    let productRepository = new ProductRepository()
    categoryService = new CategoryService(categoryRepository, productRepository)

    it('get all', async () => {
        let listAll = await categoryService.getAll()
        
    })
})