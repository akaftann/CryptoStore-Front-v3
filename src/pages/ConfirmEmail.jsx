import { useContext, useState } from "react";
import style from "./style.module.scss";
import { AuthContext } from "../context/AuthContext";
import Button from "../components/Button/Button";

export default function ConfirmEmail() {
  const { handleLogOut, maskEmail, handleActivate } = useContext(AuthContext);
  const [activationCode, setActivationCode] = useState('');

  const handleChange = (event) => {
    const code = event.target.value.replace(/\D/g, '').slice(0, 5);
    setActivationCode(code);
  };

  return (
    <div className={style.wrapper2}>
      <h1>Verify your email</h1>
      <h2>Email with activation code we sent to {`${maskEmail}`}</h2>

      <label>
        Activation Code:
        <input
          type="text"
          value={activationCode}
          onChange={handleChange}
          pattern="\d*"
          maxLength="5"
          title="Please enter only digits"
          required
        />
      </label>
      <Button onClick={() => handleActivate(activationCode)}>
        Activate
      </Button>

      <Button onClick={handleLogOut}>
        Log out
      </Button>
    </div>
  );
}
