
import React, { useEffect, useContext } from 'react';
import SumsubWebSdk from '@sumsub/websdk-react';
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const SumsubIntegration = () => {
  const { getSumsubToken, externalId, sumSubToken } = useContext(AuthContext);
  const navigate = useNavigate()
  

  useEffect(() => {
    const fetchData = async () => {
      const token = await getSumsubToken(externalId);
      console.log('ttttestt:.', token);
    };
  
    fetchData();
  }, []);

  function launchWebSdk(token) {
    console.log("launch token: ", token)
    return (

      <SumsubWebSdk
        accessToken={token}
        expirationHandler={accessTokenExpirationHandler}
        config={config}
        options={options}
        onMessage={messageHandler}
        onError={errorHandler}
      />
    );
  }

  function accessTokenExpirationHandler() {
    // Логіка для обробки закінчення терміну дії токену доступу
  }

  function config() {
    // Логіка для налаштування конфігурації
    return {
      lang: 'en',
      email: 'user@example.com',
      // Додайте інші параметри конфігурації, які вам потрібні
    };
  }

  function options() {
    // Логіка для налаштування опцій
    return {
      addViewportTag: false,
      adaptIframeHeight: true,
    };
  }

  function messageHandler(type, payload) {
    // Логіка обробки повідомлень
    console.log('onMessage', type, payload);
    console.log("type: ", type, "equal?:", type==="idCheck.onApplicantStatusChanged")
    if(type==="idCheck.onApplicantStatusChanged"){
      if(payload.reviewStatus==="completed" && payload.reviewResult.reviewAnswer==="GREEN"){
        console.log("user verified")
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    }
    
  }

  function errorHandler(error) {
    // Логіка обробки помилок
    console.error('onError', error);
  }

  return (
    <div>      
      {sumSubToken===''? ("loading..."):
      launchWebSdk(sumSubToken)}
    </div>
  );
};

export default SumsubIntegration;
