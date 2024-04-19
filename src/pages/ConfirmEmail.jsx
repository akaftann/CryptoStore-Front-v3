import { useContext, useState } from "react";
import style from "./style.module.scss";
import { AuthContext } from "../context/AuthContext";
import Button from "../components/Button/Button";
import styles from '../style';

export default function ConfirmEmail() {
  const { handleLogOut, maskEmail, handleActivate } = useContext(AuthContext);
  const [activationCode, setActivationCode] = useState('');

  const handleChange = (event) => {
    const code = event.target.value.replace(/\D/g, '').slice(0, 5);
    setActivationCode(code);
  };

  return (
    <section id="home" className={`md:flex-row flex-col ${styles.paddingY}`}>
    <div className={style.wrapper2}>
      <h1 className="text-white text-center">Verify your email</h1>
      <h1 className="text-white text-center">Email with activation code we sent to {`${maskEmail}`}</h1>

      <label className="text-white text-center">
        Activation Code:
        <input
          type="text"
          className="text-black"
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
    </section>
  );
}
