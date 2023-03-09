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

const Status = Object.freeze({
  Idle: 0,
  Loading: 1,
  Error: 2
});

const Advice = () => {
  const [status, setStatus] = useState(Status.Idle);
  const [data, setData] = useState(null)
  const isOnline = useContext(ConnectivityContext);

  const refresh = useCallback(async () => {
    setStatus(Status.Loading);
    const response = await fetchData();
    if (response) {
      setStatus(Status.Idle);
      setData(response.data);
    } else {
      setStatus(Status.Error);
    }
  }, [setData, setStatus]);

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div className={styles.advice}>
      <h2 className={styles.headerText}>Advice</h2>
      <p
        className={styles.paragraph}>{status === Status.Error ? 'Error seeking advice. Please retry...' : data?.slip.advice}</p>
      <button className={styles.button} disabled={!isOnline || status === Status.Loading} onClick={refresh}
              title={isOnline ? '' : 'Cannot seek advice while offline'}>
        {status === Status.Loading ? 'Seeking...' : 'Seek Advice 🤲'}
      </button>
    </div>
  );
}

export default Advice;
