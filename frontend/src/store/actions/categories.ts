import { ICategory } from "../../interfaces/category.interface"

export const INSERT_NEW_CATEGORY = 'INSERT_NEW_CATEGORY'
export const EDIT_CATEGORY = 'EDIT_CATEGORY'
export const DELETE_CATEGORY = 'DELETE_CATEGORY'
export const SET_CATEGORIES_LIST = 'SET_CATEGORIES_LIST'


export enum types {
    INSERT_NEW_CATEGORY, EDIT_CATEGORY, DELETE_CATEGORY, SET_CATEGORIES_LIST
}

export interface IAction {
    type: types
    payload: any
}

export const categoryInsert = (category: ICategory): IAction => ({
    type: types.INSERT_NEW_CATEGORY,
    payload: category
})

export const categoryUpdate = (category: ICategory): IAction => ({
    type: types.EDIT_CATEGORY,
    payload: category
})

export const categoryDelete = (category: ICategory): IAction => ({
    type: types.DELETE_CATEGORY,
    payload: category
})

export const categoriesSet = (categories: ICategory[]): IAction => ({
    type: types.SET_CATEGORIES_LIST,
    payload: categories
})
