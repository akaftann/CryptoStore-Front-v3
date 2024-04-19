import { useContext } from "react";
import { Link, Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import SignUp from "./pages/SignUp";
import Demo from "./pages/Demo";
import InvoicePage from './pages/Requisites2'
import ConfirmEmail from "./pages/ConfirmEmail";
import WalletInfo from "./pages/WalletInfo";
import { AuthContext } from "./context/AuthContext";
import AddWallet from './pages/AddWallet'
import Validate2faPage from './pages/Validate2FA'
import ProfilePage from './pages/Profile'
import SumsubIntegration from './pages/Sumsub'
import TwoFactorAuthRegister from './pages/TwoFactorRegister'
import SignInComponent from './pages/ComponentPages/SignInComponent'
import SignUpComponent from './pages/ComponentPages/SignUpComponent'
import ConfirmEmailComponent from './pages/ComponentPages/ConfirmEmailComponent'
import TwoFactorRegisterComponent from './pages/ComponentPages/TwoFactorRegisterComponent'
import DemoComponent from './pages/ComponentPages/DemoComponent'



const App = () => {
  const {isUserLogged, isUserActivate, isUserVerified, isFirst2FApassed, handleLogOut} = useContext(AuthContext)
  console.log("isFirst2FApassed: ", isFirst2FApassed)
  return (
    <div>
      <SnackbarProvider />
      <BrowserRouter>
       {/*  {!isUserLogged ? (
          <nav className='nav'>
            <Link to="sign-in">Sign-in</Link>
            <Link to="sign-up">Sign-up</Link>
          </nav>
        ):
        (
          <nav className='nav'>
            <Link to="demo">Home</Link>
            <Link to="profile">Profile</Link>
            <button className='navButton' onClick={handleLogOut}>Log-out</button>
          </nav>
        )

        } */}
        <Routes>
          {!isUserLogged ? (
            <>
              <Route path="sign-in" element={<SignInComponent />} />
              <Route path="sign-up" element={<SignUpComponent />} />
              <Route path="validate2fa" element={<Validate2faPage />} />
              
            </>
          ) : !isUserActivate ? 
          (
            <Route path="confirm-email" element={<ConfirmEmailComponent />} />
          )
            : !isFirst2FApassed ?
          (
            <Route path="verify2fa" element={<TwoFactorRegisterComponent />} />
          )   
            : !isUserVerified ? 
          (
            <Route path="verify" element={<SumsubIntegration />} />
          )
            :
          (
            <>
            <Route path="demo" element={<DemoComponent />} />
            <Route path="req" element={<InvoicePage />} />
            <Route path="wallet-info" element={<WalletInfo />} />
            <Route path="wallet" element={<AddWallet />} />
            <Route path="validate2fa" element={<Validate2faPage />} />
            <Route path="profile" element={<ProfilePage />} />
            </>
          ) 
          }

          <Route path="*" element={<Navigate to={!isUserLogged ? "sign-in" : !isUserActivate ? "confirm-email" : !isFirst2FApassed? "verify2fa" : isUserVerified ? "demo" : "verify"} />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
