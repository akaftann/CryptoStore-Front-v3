import { useContext } from "react";
import { Link, Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Demo from "./pages/Demo";
import IComplyIntegration from "./pages/IComplyIntegration"
import ConfirmEmail from "./pages/ConfirmEmail";
import style from "./app.module.scss";
import { AuthContext } from "./context/AuthContext";

const App = () => {
  const {isUserLogged, isUserActivate} = useContext(AuthContext)
  console.log("isUserLogged: ", isUserLogged)
  console.log("isUserActivate: ", isUserActivate)
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
          ) : isUserActivate ? (
            <>
            <Route path="demo" element={<Demo />} />
            <Route path="verify" element={<IComplyIntegration />} />
            </>
          ) : (
            <Route path="confirm-email" element={<ConfirmEmail />} />
          )}

          <Route path="*" element={<Navigate to={!isUserLogged ? "sign-in" : isUserActivate ? "demo" : "confirm-email"} />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
