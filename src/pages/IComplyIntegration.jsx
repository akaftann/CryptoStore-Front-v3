import React, { useEffect } from 'react';
import useScript from '../hooks/Verify';


const IComplyIntegration = () => {
  useScript('https://verify.icomplykyc.com/icomply-min.js');
  

  return <div id="iComply"></div>;
};

export default IComplyIntegration;
