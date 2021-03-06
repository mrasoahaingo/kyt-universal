import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './styles.scss';

const App = ({ children }) => {
  return (
    <div>
      <i className={styles.logo}/>
      <ul className={styles.nav}>
        <li className={styles.navItem}>
          <Link className={styles.link} to="/">Home</Link>
        </li>
        <li className={styles.navItem}>
          <Link className={styles.link} to="/tools">Tools</Link>
        </li>
        <li className={styles.navItem}>
          <Link className={styles.link} to="/user">Users</Link>
        </li>
      </ul>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}

App.propTypes = {
  children: PropTypes.node,
};

export default App;
