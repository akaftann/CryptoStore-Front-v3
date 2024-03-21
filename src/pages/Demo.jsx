import { useContext, useState, useEffect } from "react";
import style from "./style.module.scss";
import { AuthContext } from "../context/AuthContext";
import Button from "../components/Button/Button";
import { useNavigate } from "react-router-dom";
import showErrorMessage from "../utils/showErrorMessage";

export default function Demo() {
  const { handleLogOut, wallet } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    console.log('click buy, wallet:', wallet)
    if(!wallet){
      const error = new Error('Request failed');
      error.response = {
        data: {
          error: 'Add your wallet info first'
        }
      };

      showErrorMessage(error)
      return navigate('/wallet-info')
    }
    navigate('/req')
  };

  return (
    <div className={style.wrapper}>
      <Button onClick={handleButtonClick}>
        Buy USDt
      </Button>
      <Button onClick={handleLogOut}>
        Log out
      </Button>
    </div>
  );
}
