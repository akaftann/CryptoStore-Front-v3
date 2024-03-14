import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import Button from "../components/Button/Button";
import { useNavigate } from "react-router-dom";
import style from "./style.module.scss";

const defaultValues = {
  walletNumber: "",
  network: "",
};


export default function WalletInfo() {
  const { handleDeleteWallet, wallet, network, getWallet } = useContext(AuthContext);

  useEffect(() => {
    getWallet()
  }, []);

  const navigate = useNavigate();
  const handleAddWallet = () => {
    console.log('button click')
    navigate('/wallet')
  };

  return (
    <div className={style.wrapper}>
      {wallet && network ? (
        <div className="justify-center items-start">
          <h3 className="flex-1 font-poppins font-semibold ss:text-[35px] text-[35px]">Wallet Information</h3>
          <p>Wallet Number: {wallet}</p>
          <p>Network: {network}</p>
          <Button onClick={handleDeleteWallet}>
            Delete
          </Button>
        </div>
      ):
      (
        <div className="wallet-info">
            <h3>Wallet Information</h3>
            <h2>You don't have any wallet yet</h2>
            <Button onClick={handleAddWallet}>
                Add wallet
            </Button>
        </div>
      )}
    </div>
  );
}
