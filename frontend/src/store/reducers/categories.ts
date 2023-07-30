import { ICategory } from "../../interfaces/category.interface"
import { IAction, types } from "../actions"
import { v4 as uuidv4 } from 'uuid';

type State = ICategory[]

const initialState: State = []

const reducer = (state: State = initialState, action: IAction) => {  
    switch(action.type){
        case types.SET_CATEGORIES_LIST:
            const categoriesList: ICategory[] = action.payload as ICategory[]
            return [
                ...categoriesList
            ]
        case types.INSERT_NEW_CATEGORY:
            const newCategory = action.payload

            if(state.find(cat => cat.id == newCategory.id)){
                return [...state]
            }
            
            return [
                ...state,
                newCategory
            ]
        case types.EDIT_CATEGORY:
            const newState: State = []
            state.map(cat => {
                let newCat: ICategory = {
                    ...cat
                }
                if(newCat.id == (action.payload as ICategory).id){
                    newCat.name = (action.payload as ICategory).name
                }
                newState.push(newCat)
            })
            return newState
        case types.DELETE_CATEGORY:
            const deletedCategory: ICategory = action.payload
            return state.filter(cat => cat.id != deletedCategory.id)
        default:
            return state
        
    }
}

export default reducer