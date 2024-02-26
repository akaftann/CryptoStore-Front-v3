import { useContext, useState, useEffect } from "react";
import style from "./style.module.scss";
import { AuthContext } from "../context/AuthContext";
import Button from "../components/Button/Button";

const loadTokenOfTrustScript = () => {
  const script = document.createElement("script");
  script.src = "https://app.tokenoftrust.com/embed/embed.js";
  script.async = true;

  document.head.appendChild(script);

  script.onload = () => {
    if (typeof tot !== 'undefined') {
      tot("setPublicKey", "public_live_FaTBcCsY");
    }
  };

  script.onerror = (error) => {
    console.error('Помилка при завантаженні скрипта Token of Trust:', error);
    // Додайте логіку для обробки помилок, якщо потрібно
  };
};

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
