import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema, addWalletSchema } from "./validtionSchemas";
import Field from "../components/Field/Field";
import Button from "../components/Button/Button";
import { useNavigate } from "react-router-dom";
import style from "./style.module.scss";

const defaultValues = {
  walletNumber: "",
  network: "",
};

export default function AddWallet() {
  const { handleAddWallet, wallet, network} = useContext(AuthContext);
  const navigate = useNavigate();
  const addWallet = (data) =>{
    handleAddWallet(data)
    navigate('/wallet-info')
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    resolver: yupResolver(addWalletSchema),
  });

  return (
    <form onSubmit={handleSubmit(addWallet)} className={style.wrapper}>
      <h2>Add wallet</h2>
      <Field
        name="walletNumber"
        register={register}
        autoComplete="off"
        placeholder="your wallet number"
        error={Boolean(errors.walletNumber)}
        helperText={errors.walletNumber?.message}
      />
      <Field
        name="network"
        register={register}
        autoComplete="off"
        placeholder="your network"
        error={Boolean(errors.network)}
        helperText={errors.network?.message}
      />
      <Button disabled={isSubmitting} type="submit">
        Submit
      </Button>
    </form>
  );
}
