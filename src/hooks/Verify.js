
import { useEffect } from 'react';
import config from '../config';
import inMemoryJWT from '../services/inMemoryJWTService';

const useScript = url => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    script.onload = () => {
      window.iComply.init(document.getElementById('iComply'), {
        callback(serverResponse) {
          fetch(`${config.API_URL}/icomplyListener`, {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${inMemoryJWT.getToken()}`,
            },
            body: JSON.stringify(serverResponse),
          }).then(res =>
            serverResponse.summaryResult === 'PASS'
              ? window.confirm('Automated ID Verification successful.') &&
                window.location.replace(`${config.APP_URL}/oauth/auth?response_type=code&scope=signature&client_&redirect_uri=${config.APP}/signup`)
              : window.confirm('Automated ID Verification unsuccessful.'),
          );
        },
        verificationIdCallback: function (verificationId) {
          console.log(verificationId);
        },
      });
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [url]);
};

export default useScript;
