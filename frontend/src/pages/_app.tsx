import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../components/navbar'
import Head from 'next/head'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Button, Container, Grid} from '@mui/material'
import '../styles/custom.css'
import { wrapper } from '../store'


function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Head>
        <title>Stock Management Tool</title>
        <meta name="description" content="Created by gustavo torregrosa" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
    </Head>
    <Navbar />
    <Container maxWidth="lg">
      <br/><br/><br/>
      <Component {...pageProps} />
    </Container>
  </>
}

export default wrapper.withRedux(MyApp);
