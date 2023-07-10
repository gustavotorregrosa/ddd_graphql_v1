import { CategoryService } from "./service"
import { CategoryRepository } from "../../../infra/category/repository";
// import { ProductRepository } from "src/infra/product/repository"
import { ProductRepository } from "../../../infra/product/repository";
import { Test } from '@nestjs/testing';

describe('resolver',  () => {


    // let categoryService: CategoryService
    // let categoryRepository: CategoryRepository
    // let productRepository: ProductRepository

    // beforeAll(async() => {
    //     const moduleTest = await Test.createTestingModule({
    //         providers: [CategoryService, CategoryRepository, ProductRepository]
    //     }).compile()

    //     categoryService = moduleTest.get<CategoryService>(CategoryService)

    // })
   


    let categoryService: CategoryService
    let categoryRepository = new CategoryRepository()
    let productRepository = new ProductRepository()
    categoryService = new CategoryService(categoryRepository, productRepository)

    it('get all', async () => {
        let listAll = await categoryService.getAll()
        
    })

    // let catsController: CatsController;
    // let catsService: CatsService;

    // beforeEach(async () => {
    //     const moduleRef = await Test.createTestingModule({
    //         controllers: [CatsController],
    //         providers: [CatsService],
    //     }).compile();

    //     catsService = moduleRef.get<CatsService>(CatsService);
    //     catsController = moduleRef.get<CatsController>(CatsController);
    // });


})