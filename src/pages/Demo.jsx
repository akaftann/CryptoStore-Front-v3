import { useContext, useState, useEffect } from "react";
import style from "./style.module.scss";
import { AuthContext } from "../context/AuthContext";
import Button from "../components/Button/Button";
import { useNavigate } from "react-router-dom";

export default function Demo() {
  const { data, handleLogOut, handleFetchProtected } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/req')
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
