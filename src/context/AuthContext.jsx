import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { Circle } from "react-preloaders";
import config from "../config";
import style from "../app.module.scss";
import showErrorMessage from "../utils/showErrorMessage";
import inMemoryJWT from "../services/inMemoryJWTService";



export const authClient = axios.create({baseURL:`${config.API_URL}/`,
  withCredentials:true})

const ResourceClient = axios.create({baseURL:`${config.API_URL}/protected`,
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
})

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [isAppReady, setIsAppReady] = useState(false)
  const [isUserLogged, setIsUserLogged] = useState(false)
  const [data, setData] = useState();
  const [isUserActivate, setIsUserActivate] = useState(false);
  const [maskEmail, setMaskEmail] = useState();

  const handleFetchProtected = async() => {
    try{
      const data = await ResourceClient.get('/')
      setData(data.data)
    }catch(e){
      showErrorMessage(e)
    }
  };

  const handleLogOut = async () => {
    const responce = await authClient.post('/logout')
    inMemoryJWT.deleteToken()
    setIsUserLogged(false)
    setIsUserActivate(false)
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
      const {accessToken, isActivate, email} = responce.data
      inMemoryJWT.setToken(accessToken)
      setIsUserLogged(true)
      setIsUserActivate(isActivate)
      setMaskEmail(email)
    }catch(e){
      showErrorMessage(e)
    }
  };

  useEffect(()=>{
   authClient.get('/refresh')
   .then((res)=>{
    console.log('data:', res.data)
    inMemoryJWT.setToken(res.data.accessToken)
    setIsUserLogged(true)
    setIsAppReady(true)
    setIsUserActivate(res.data.isActivate)
    setMaskEmail(res.data.email)
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
        isAppReady,
        isUserLogged,
        isUserActivate,
        maskEmail,
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
