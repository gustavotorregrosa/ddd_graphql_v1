import { ICategory } from '@/interfaces/category.interface';
import client from '../graphql/client.graphql'
import { gql, useMutation } from "@apollo/client"



export async function getAll(): Promise<ICategory[]> {
    const { data } = await client.query({
      query: gql`
        query {
            getAllCategories {
                id name
            }
        }
      `,
    });

    return data.getAllCategories as ICategory[]
}


export async function getCategoryWithProducts(cat: ICategory): Promise<ICategory> {
  const { data } = await client.query({
    query: gql`
      query {
        getOneCategory(id: "${cat.id}") {
              id name products {
                id name
              }
          }
      }
    `,
  });

  return data.getOneCategory as ICategory
}

export async function createOne(name: string): Promise<ICategory> {
    const mutationQuery =  gql`
      mutation {
        createCategory(category: {
          name: "${name}",
        }){
          id name
        }
      }
    `

    const { data } = await client.mutate({
      mutation: mutationQuery
    })

    return data.createCategory as ICategory

}

export async function edit(category: ICategory): Promise<ICategory> {
  const {id, name} = category

  const mutationQuery =  gql`
    mutation {
      editCategory(category: {
        id: "${id}",
        name: "${name}",
      }){
        id name
      }
    }
  `

  const { data } = await client.mutate({
    mutation: mutationQuery
  })

  return data.editCategory as ICategory
}


export async function del(category: ICategory): Promise<ICategory> {
  const {id} = category

  const mutationQuery =  gql`
    mutation {
      deleteCategory(category: {
        id: "${id}",
      }){
        id name
      }
    }
  `

  const { data } = await client.mutate({
    mutation: mutationQuery
  })

  return data.deleteCategory as ICategory
}