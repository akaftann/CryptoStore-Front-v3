import { useContext } from "react";
import style from "./style.module.scss";
import { AuthContext } from "../context/AuthContext";
import Button from "../components/Button/Button";

export default function ConfirmEmail() {
  const {  handleLogOut, maskEmail } = useContext(AuthContext);
  return (
    <div className={style.wrapper2}>
      <h1>Verify your email</h1>
      <h2>Email with instructions we sent to {`${maskEmail}`}</h2>
      <Button onClick={handleLogOut}>
        Log out
      </Button>
    </div>
  );
}
