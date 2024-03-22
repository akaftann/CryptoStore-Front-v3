import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { Circle } from "react-preloaders";
import config from "../config";
import style from "../app.module.scss";
import showErrorMessage from "../utils/showErrorMessage";
import inMemoryJWT from "../services/inMemoryJWTService";
import { toast } from "react-toastify";



export const authClient = axios.create({baseURL:`${config.API_URL}/`,
  withCredentials:true})

const ResourceClient = axios.create({baseURL:`${config.API_URL}/`,
  withCredentials:true})

ResourceClient.interceptors.request.use((config)=>{
  const accessToken = inMemoryJWT.getToken()
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
      const response = await axios.get(`${config.API_URL}/refresh`, {withCredentials:true})
      inMemoryJWT.setToken(response.data.accessToken)
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
  const [wallet, setWallet] = useState('');
  const [network, setNetwork] = useState('');
  const [requestLoading, setRequestLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [secret, setSecret] = useState({otpauthUrl: "", base32: ""});
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [userId, setUserId] = useState('');
  const [tempData, setTempData] = useState({});
  const [openModalValidate, setOpenModalValidate] = useState(false);
  const [isFirst2FApassed, setisFirst2FApassed] = useState(false);
  

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
    setSumSubToken(result.data.token)
    return result.data.token
  }

  const handleLogOut = async () => {
    const response = await authClient.post('/logout')
    inMemoryJWT.deleteToken()
    setIsUserLogged(false)
    setIsUserActivate(false)
  };

  const handleActivate = async (code) => {
    try{
      const data = {activationCode: code}
      const response = await ResourceClient.post('/activate',data)
      if(response.data.isActivated){
        setIsUserActivate(true)
        setExternalId(response.data.externalId)
      }
    }catch(e){
      showErrorMessage(e)
    }
  };

  const handleSignUp = async (data) => {
    try{
      const response = await authClient.post('/registration', data)
      const {accessToken, email} = response.data
      inMemoryJWT.setToken(accessToken)
      setIsUserLogged(true)
      setMaskEmail(email)
    }catch(e){
      showErrorMessage(e)
    }
  }

  const verifyOtp = async (token, closeModal) => {
    try {
      setRequestLoading(true);
      const response = await ResourceClient.post('/otp/verify', {token})
      if(response.data.otpEnabled){
        setIs2FAEnabled(response.data.otpEnabled)
      }
      setRequestLoading(false);
      closeModal();
      toast.success("Two-Factor Auth Enabled Successfully", {
        position: "top-right",
      });
      return 
    } catch (e) {
      setRequestLoading(false);
      showErrorMessage(e)
    }
  };

  const verifyOtpRegister = async (token) => {
    try {
      setRequestLoading(true);
      const response = await ResourceClient.post('/otp/verify', {token, firstOtpPassed: true})
      if(response.data.otpEnabled){
        setIs2FAEnabled(response.data.otpEnabled)
        setisFirst2FApassed(true)
      }
      setRequestLoading(false);
      return 
    } catch (e) {
      setRequestLoading(false);
      showErrorMessage(e)
    }
  };

  const completeSignIn = async (data) => {
    try{
      const response = await authClient.post('/login', data)
      const { accessToken, isActivated, email, isVerified, otpEnabled} = response.data
      inMemoryJWT.setToken(accessToken)
      setIsUserLogged(true)
      setIsUserActivate(isActivated)
      setMaskEmail(email)
      setIsUserVerified(isVerified)
      setIs2FAEnabled(otpEnabled)
    }catch(e){
      showErrorMessage(e)
    }
  }

  const handleSignIn = async (data) => {
    try{
      const response = await authClient.post('/prelogin', data)
      const { email, otpEnabled, userId} = response.data
      setUserId(userId)
      if(!otpEnabled){
        return completeSignIn(data)
      }
      setTempData(data)
      setOpenModalValidate(true)
      
    }catch(e){
      showErrorMessage(e)
    }
  };


  const handleAddWallet = async (data) => {
    try{
      console.log('triying add wallet', data)
      const response = await ResourceClient.post('/wallet', data)
      const {walletNumber, network} = response.data
      setWallet(walletNumber)
      setNetwork(network)
    }catch(e){
      showErrorMessage(e)
    }
  };

  const getWallet = async () => {
    try{
      const response = await ResourceClient.get('/wallet')
      const {wallet, network} = response.data
      if(wallet){
        setWallet(wallet)
        setNetwork(network)
      }
    }catch(e){
      showErrorMessage(e)
    }
  };

  const handleDeleteWallet = async () => {
    try{
      const response = await ResourceClient.get('/wallet/remove')
      setWallet('')
      setNetwork('')
    }catch(e){
      showErrorMessage(e)
    }
  };

  

  const validate2fa = async (token, userId) => {
    try {
      setRequestLoading(true);
      const response = await ResourceClient.post('/otp/validate', {token, userId})
      const {otpValid} = response.data
      setRequestLoading(false);
     return otpValid
    } catch (e) {
      setRequestLoading(false);
      showErrorMessage(e)
    }
  };

  const generateQrCode = async () => {
    try {
      setRequestLoading(true);
      const response = await ResourceClient.get('/otp/generate')
      console.log("generating qr:", response)
      setRequestLoading(false);

      if (response.status === 200) {
        setSecret({
          otpauthUrl: response.data.result.otpAuthUrl,
          base32: response.data.result.base32,
        });
        if(isFirst2FApassed){
          setOpenModal(true);
        }
      }
      return response.data.result
    } catch (e) {
      setRequestLoading(false);
      showErrorMessage(e)
    }
  };


  const disableTwoFactorAuth = async () => {
    try {
      setRequestLoading(true);
      const response = await ResourceClient.get('/otp/disable')
      setRequestLoading(false);
      if(response.data.isDisabled){
        setIs2FAEnabled(false)
        toast.warning("Two Factor Authentication Disabled", {
        position: "top-right",
        });
      }
      
    } catch (e) {
      setRequestLoading(false);
      showErrorMessage(e)
    }
  };

  const actions = {
    1: completeSignIn,
    2: handleDeleteWallet,
    3: handleAddWallet,
    4: disableTwoFactorAuth
  }


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
    setWallet(res.data.walletNumber)
    setNetwork(res.data.network)
    setIs2FAEnabled(res.data.otpEnabled)
    setUserId(res.data.userId)
    setisFirst2FApassed(res.data.firstOtpPassed)
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
        handleAddWallet,
        handleDeleteWallet,
        getSumsubToken,
        getWallet,
        verifyOtp,
        validate2fa,
        generateQrCode,
        disableTwoFactorAuth,
        setOpenModal,
        setOpenModalValidate,
        completeSignIn,
        setTempData,
        verifyOtpRegister,
        sumSubToken,
        isUserVerified,
        isAppReady,
        isUserLogged,
        isUserActivate,
        maskEmail,
        externalId,
        wallet,
        network,
        requestLoading,
        openModal,
        openModalValidate,
        secret,
        is2FAEnabled,
        tempData,
        userId,
        actions,
        isFirst2FApassed,
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
