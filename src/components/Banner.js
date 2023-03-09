import {ConnectivityContext} from '@/providers/ConnectivityProvider';
import styles from './Banner.module.css';
import {useContext} from 'react';

const Banner = () => {
  const isOnline = useContext(ConnectivityContext);

  return (
    <div className={`${styles.banner} ${styles[isOnline ? 'online' : 'offline']}`}>
      {isOnline ? 'Online' : 'Offline'}
    </div>
  );
};

export default Banner;
