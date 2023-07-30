import Head from 'next/head'
import Table, { column } from '../../components/table'
import { ICategory } from '@/interfaces/category.interface'
import { AppState } from '../../store';
import { useSelector, useDispatch } from "react-redux";
import { ChangeEvent, useEffect, useState } from 'react';
import { categoriesSet, categoryDelete, categoryInsert, categoryUpdate } from '../../store/actions';
import {EditModal} from './editModal'
import { DeleteModal } from './deleteModal';
import { Button, Grid } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { createOne, del, edit, getAll, getCategoryWithProducts } from '@/services/category.service';
import { useSubscription } from '@apollo/client';
import { CATEGORY_ADDED_SUBSCRIPTION } from '@/subscriptions/category.subscription';

export default function Categories(){

    const { data, loading, error } = useSubscription(CATEGORY_ADDED_SUBSCRIPTION)

    // const readAllCategories = async () => {
    //     const allCategories: ICategory[] = await getAll()
    //     console.log({allCategories})
    //     dispatch(categoriesSet(allCategories))
    // }

    useEffect(() => {
        (async () => {
            const allCategories: ICategory[] = await getAll()
            dispatch(categoriesSet(allCategories))
        })()
    }, [])

    useEffect(() => {
        console.log({data})
        console.log({error})
        console.log({loading})
        
        
        if(data){
            console.log(data.categoryAdded.name)
            dispatch(categoryInsert(data.categoryAdded))
            // setTimeout(() => {
            //     readAllCategories()
            // }, 2000)
        }

  
      }, [data, loading, error])


    const columns: column[] = [
        // {
        //     label: 'ID',
        //     name: 'id'
        // },
        {
            label: 'Category',
            name: 'name'
        }
    ]
    let rows = useSelector<AppState, ICategory[]>(state => state.categories)

    const dispatch = useDispatch()

    const [editOpen, setEditOpen] = useState(false)
    const handleEditOpen = () => setEditOpen(true)
    const handleEditClose = () => setEditOpen(false)

    const [deleteOpen, setDeleteOpen] = useState(false)
    const handleDeleteOpen = () => setDeleteOpen(true)
    const handleDeleteClose = () => setDeleteOpen(false)

    const emptyCategory: ICategory = {
        id: '',
        name: ''
    }

    const [categoryOnEdition, setCategoryOnEdition] = useState<ICategory>(emptyCategory)
    const [categoryOnDeletion, setCategoryOnDeletion] = useState<ICategory>(emptyCategory)

    const onSaveClick = async () => {
        if(categoryOnEdition.id != ''){
            const editedCategory: ICategory = await edit(categoryOnEdition)
            dispatch(categoryUpdate(editedCategory))
        }else{
            const newCategory: ICategory = await createOne(categoryOnEdition.name)
            dispatch(categoryInsert(newCategory))
        }
        handleEditClose()
    }

    const onDeleteConfirmClick = async () => {
        const deletedCategory = await del(categoryOnDeletion)
        dispatch(categoryDelete(deletedCategory))
        handleDeleteClose()
    }

    const changeCatName = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setCategoryOnEdition(cat => {
           return {
            ...cat,
            name: e.target.value
           }
        })
    }
    
    const onEditClick = (cat: ICategory) => {
        setCategoryOnEdition(cat)
        handleEditOpen()
    }

    const onDeleteClick = (cat: ICategory) => {
        setCategoryOnDeletion(cat)
        handleDeleteOpen()
    }

    const onViewClick = async (cat: ICategory) => {
        const catWithProducts = await getCategoryWithProducts(cat)
    }

    const onAddClick = () => {
        setCategoryOnEdition(emptyCategory)
        handleEditOpen()
    }

    return <>
        <Head>
            <title>Categories</title>
        </Head>
     
        <Grid container spacing={2}>
            <Grid item xs={11}>
                <h4>Categories</h4>
            </Grid>
            <Grid item xs={1} >
                <Button onClick={onAddClick} variant="outlined"><AddIcon/></Button>
            </Grid>
        </Grid>
        <br/><br/>
        <Table onViewClick={onViewClick} onDeleteClick={onDeleteClick} columns={columns} onEditClick={onEditClick} rows={rows} />
        <EditModal handleSave={onSaveClick} handleEdit={changeCatName} name={categoryOnEdition.name} open={editOpen} handleClose={handleEditClose} />
        <DeleteModal open={deleteOpen} handleClose={handleDeleteClose} handleDelete={onDeleteConfirmClick} name={categoryOnDeletion.name} />
    </>
}