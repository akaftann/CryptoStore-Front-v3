import { useContext, useState, useEffect } from "react";
import style from "./style.module.scss";
import { AuthContext } from "../context/AuthContext";
import Button from "../components/Button/Button";
import { useNavigate } from "react-router-dom";
import showErrorMessage from "../utils/showErrorMessage";
import styles from '../style';

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
      return navigate('/profile')
    }
    navigate('/req')
  };

  return (
    <section id="home" className={`md:flex-row flex-col sm:py-40 py-20`}>
    <div className={style.wrapper}>
      <Button onClick={handleButtonClick}>
        Buy USDt
      </Button>
      <Button onClick={handleLogOut}>
        Log out
      </Button>
    </div>
    </section>
  );
}
