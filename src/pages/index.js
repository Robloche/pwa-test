import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import {useState} from "react";

const fetchData = async () => {
  const response = await fetch("https://api.adviceslip.com/advice");
  const data = await response.json();
  return {data};
}

const Home = (props) => {
  const [data, setData] = useState(props.data)

  const refresh = async () => {
    const {data} = await fetchData();
    setData(data);
  }

  return (
    <>
      <Head>
        <title>PWA Test</title>
        <meta name='viewport'
              content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'/>
      </Head>
      <main className={styles.main}>
        <div className={styles.app}>
          <h2 className={styles.headerText}>Advice</h2>
          <p className={styles.paragraph}>{data.slip.advice}</p>
          <button className={styles.button} onClick={refresh}>
            Seek Advice 🤲
          </button>
        </div>
      </main>
    </>
  )
}

Home.getInitialProps = fetchData;
export default Home;
