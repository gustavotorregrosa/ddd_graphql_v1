import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import {useEffect} from 'react'
import { useRouter } from 'next/router'
import {useSubscription} from '@apollo/client';
import { CATEGORY_ADDED_SUBSCRIPTION } from '@/subscriptions/category.subscription'

export default function Home() {

  const router = useRouter()
  // const { data, loading, error } = useSubscription(CATEGORY_ADDED_SUBSCRIPTION)
  
  useEffect(() => {
    router.push('/categories')
  }, [])


  // useEffect(() => {
  //   console.log({data})
  //   console.log({error})
  //   console.log({loading})
  //   // if(data){
  //   //   console.log({data})
  //   // }
  // }, [data, loading, error])


  return (
    <>
    
    </>
  )
}
