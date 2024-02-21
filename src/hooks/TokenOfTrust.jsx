// TokenOfTrust.js

import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

const TokenOfTrust = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://app.tokenoftrust.com/embed/embed.js';

    const head = document.head || document.getElementsByTagName('head')[0];
    head.appendChild(script);

    window.tot = window.tot || function () {
      (window.tot.q = window.tot.q || []).push(arguments);
    };

    window.tot('setPublicKey', 'public_live_FaTBcCsYDSSgyzWLnBK8');
  }, []);

  return (
    <Helmet>
      {/* Add any other meta tags or title modifications here */}
    </Helmet>
  );
};

export default TokenOfTrust;
