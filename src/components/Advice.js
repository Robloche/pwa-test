import {useCallback, useContext, useEffect, useState} from 'react';
import {ConnectivityContext} from '@/providers/ConnectivityProvider';
import styles from './Advice.module.css';

const fetchData = async () => {
  try {
    const response = await fetch('https://api.adviceslip.com/advice');
    const data = await response.json();
    return {data};
  } catch {
    console.log('Error fetching data');
    return null;
  }
}

const Advice = () => {
  const [data, setData] = useState(null)
  const isOnline = useContext(ConnectivityContext);

  const refresh = useCallback(async () => {
    const response = await fetchData();
    if (response) {
      setData(response.data);
    }
  }, [setData]);

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div className={styles.advice}>
      <h2 className={styles.headerText}>Advice</h2>
      <p className={styles.paragraph}>{data?.slip.advice}</p>
      <button className={styles.button} disabled={!isOnline} onClick={refresh}
              title={isOnline ? '' : 'Cannot seek advice while offline'}>
        Seek Advice 🤲
      </button>
    </div>
  );
}

export default Advice;
