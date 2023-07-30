import { IProduct } from "../product/domain.interface"

export interface ICategory {
    id: string
    name: string
    description?: string
    products: IProduct[]
    attachProduct: (product: IProduct) => void
}