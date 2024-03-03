import { useContext } from "react";
import { Link, Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Demo from "./pages/Demo";
import Verify from "./pages/Verify";
import ConfirmEmail from "./pages/ConfirmEmail";
import style from "./app.module.scss";
import { AuthContext } from "./context/AuthContext";
import SumsubIntegration from './pages/Sumsub'

const App = () => {
  const {isUserLogged, isUserActivate, isUserVerified} = useContext(AuthContext)
  console.log("isUserLogged: ", isUserLogged)
  console.log("isUserActivate: ", isUserActivate)
  console.log("isUserVerified: ", isUserVerified)
  return (
    <div className={style.wrapper}>
      <SnackbarProvider />
      <BrowserRouter>
        {!isUserLogged && (
          <nav className={style.nav}>
            <Link to="sign-in">Sign-in</Link>
            <Link to="sign-up">Sign-up</Link>
            
            {/* <Link to="demo">Демо</Link> */}
          </nav>
        )

        }
        <Routes>
          {!isUserLogged ? (
            <>
              <Route path="sign-in" element={<SignIn />} />
              <Route path="sign-up" element={<SignUp />} />
            </>
          ) : !isUserActivate ? 
          (
            <Route path="confirm-email" element={<ConfirmEmail />} />
          )
            : !isUserVerified ?
          (
            <Route path="verify" element={<SumsubIntegration />} />
          )
            :
          (
            <>
            <Route path="demo" element={<Demo />} />
            </>
          ) 
          }

          <Route path="*" element={<Navigate to={!isUserLogged ? "sign-in" : !isUserActivate ? "confirm-email" : isUserVerified ? "demo" : "verify"} />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
