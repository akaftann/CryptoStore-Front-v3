// Layout.jsx
import React from 'react';
import Navbar from '../PageComponents/Navbar';
import styles from '../../style';


const Layout = ({ children }) => (
  <div className="bg-primary w-full h-screen flex flex-col">
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Navbar />
      </div>
    </div>

    <div className={`flex-1 overflow-auto ${styles.flexStart}`}>
      <div className={`${styles.boxWidth} ${styles.paddingY}`}>
        {children}
      </div>
    </div>
  </div>
);

export default Layout;

