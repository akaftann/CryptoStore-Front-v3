import { useContext, useState, useEffect } from "react";
import style from "./style.module.scss";
import { AuthContext } from "../context/AuthContext";
import Button from "../components/Button/Button";

export default function Demo() {
  const { data, handleLogOut, handleFetchProtected } = useContext(AuthContext);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  const handleButtonClick = () => {
    // Якщо кнопка натискана, а скрипт не завантажений, завантажуємо його
    if (!scriptLoaded) {
      loadTokenOfTrustScript();
      setScriptLoaded(true);
    }

    // Тут можна викликати інші функції або логіку, пов'язану з вашою кнопкою
  };

  return (
    <div className={style.wrapper}>
      <p>{JSON.stringify(data)}</p>
      <Button onClick={handleButtonClick}>
        Buy USDt
      </Button>
      <Button onClick={handleLogOut}>
        Log out
      </Button>
    </div>
  );
}
