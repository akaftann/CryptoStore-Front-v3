// Layout.jsx
import React from 'react';
import Navbar from '../PageComponents/Navbar';
import styles from '../../style';

console.log('layout settings:', styles)
const Layout = ({ children }) => (
  <div className="bg-primary w-full overflow-hidden">
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Navbar />
      </div>
    </div>

    <div className={`bg-primary h-screen overflow-auto ${styles.flexStart}`}>
      <div className={`${styles.boxWidth} ${styles.paddingY}`}>
        {children}
      </div>
    </div>
  </div>
);

export default Layout;
