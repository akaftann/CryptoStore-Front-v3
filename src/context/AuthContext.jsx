import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { Circle } from "react-preloaders";
import config from "../config";
import style from "../app.module.scss";
import showErrorMessage from "../utils/showErrorMessage";
import inMemoryJWT from "../services/inMemoryJWTService";



export const authClient = axios.create({baseURL:`${config.API_URL}/`,
  withCredentials:true})

const ResourceClient = axios.create({baseURL:`${config.API_URL}/`,
  withCredentials:true})

ResourceClient.interceptors.request.use((config)=>{
  const accessToken = inMemoryJWT.getToken()
  console.log('starting interseptor')
  console.log('accessToken: ', accessToken)
  if(accessToken){
    config.headers["Authorization"] = `Bearer ${accessToken}`
  }
  return config
}, (err)=>{
  Promise.reject(err)
})

ResourceClient.interceptors.response.use((config)=>{
  return config
}, async(error)=>{
  const originalRequest = error.config
  if(error.response.status == 401){
    try{
      const responce = await axios.get(`${config.API_URL}/refresh`, {withCredentials:true})
      inMemoryJWT.setToken(responce.data.accessToken)
      authClient.request(originalRequest)
      return setIsUserLogged(true)
    }catch(e){
      setIsUserLogged(false)
      showErrorMessage(e)
    }
  }
  else{
    throw error
  }
})

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [isAppReady, setIsAppReady] = useState(false)
  const [isUserLogged, setIsUserLogged] = useState(false)
  const [data, setData] = useState();
  const [isUserActivate, setIsUserActivate] = useState(false);
  const [isUserVerified, setIsUserVerified] = useState(false);
  const [maskEmail, setMaskEmail] = useState();
  const [sumSubToken, setSumSubToken] = useState('');
  const [externalId, setExternalId] = useState('');

  const handleFetchProtected = async() => {
    try{
      window.location.href = `${config.APP}`;
      /* const data = await ResourceClient.get('/')
      setData(data.data) */
    }catch(e){
      showErrorMessage(e)
    }
  };

  const getSumsubToken = async (email) => {
    const data = { externalId: email}
    const result = await authClient.post('/access-token',data)
    console.log('getSumsubToken: ', result.data.token)
    setSumSubToken(result.data.token)
    return result.data.token
  }

  const handleLogOut = async () => {
    const responce = await authClient.post('/logout')
    inMemoryJWT.deleteToken()
    setIsUserLogged(false)
    setIsUserActivate(false)
  };

  const handleActivate = async (code) => {
    try{
      const data = {activationCode: code}
      const responce = await ResourceClient.post('/activate',data)
      console.log('responce after activate:. ', responce)
      if(responce.data.isActivated){
        setIsUserActivate(true)
        setExternalId(responce.data.externalId)
      }
    }catch(e){
      showErrorMessage(e)
    }
  };

  const handleSignUp = async (data) => {
    try{
      const responce = await authClient.post('/registration', data)
      const {accessToken, email} = responce.data
      console.log('sign up link: ', responce.data)
      inMemoryJWT.setToken(accessToken)
      setIsUserLogged(true)
      setMaskEmail(email)
    }catch(e){
      showErrorMessage(e)
    }
  }

  const handleSignIn = async (data) => {
    try{
      const responce = await authClient.post('/login', data)
      const {accessToken, isActivated, email, isVerified} = responce.data
      inMemoryJWT.setToken(accessToken)
      setIsUserLogged(true)
      setIsUserActivate(isActivated)
      setMaskEmail(email)
      setIsUserVerified(isVerified)
    }catch(e){
      console.log('it login error', e)
      showErrorMessage(e)
    }
  };

  useEffect(()=>{
   authClient.get('/refresh')
   .then((res)=>{
    inMemoryJWT.setToken(res.data.accessToken)
    setIsUserLogged(true)
    setIsAppReady(true)
    setIsUserActivate(res.data.isActivate)
    setMaskEmail(res.data.email)
    setExternalId(res.data.externalId)
    setIsUserVerified(res.data.isVerified)
   })
    .catch((e)=>{
      setIsUserLogged(false)
      setIsAppReady(true)
    })
  }, [])

  return (
    <AuthContext.Provider
      value={{
        data,
        handleFetchProtected,
        handleSignUp,
        handleSignIn,
        handleLogOut,
        handleActivate,
        getSumsubToken,
        sumSubToken,
        isUserVerified,
        isAppReady,
        isUserLogged,
        isUserActivate,
        maskEmail,
        externalId,
      }}
    >
      {isAppReady ? (
        children
      ) : (
        <div className={style.centered}>
          <Circle />
        </div>
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
