import Advice from '@/components/Advice';
import Banner from '@/components/Banner';
import ConnectivityProvider from '@/providers/ConnectivityProvider';
import Head from 'next/head'
import styles from '@/styles/Home.module.css'

const Home = () => {
  return (
    <ConnectivityProvider>
      <Head>
        <title>PWA Test</title>
        <meta name='viewport'
              content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'/>
      </Head>
      <Banner/>
      <main className={styles.main}>
        <Advice/>
      </main>
    </ConnectivityProvider>
  )
}

export default Home;
