import { row } from "../components/table"

export interface ICategory extends row {
    // id: string
    name: string
    products: any[]
}