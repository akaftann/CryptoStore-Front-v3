import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema, addWalletSchema } from "./validtionSchemas";
import Field from "../components/Field/Field";
import Button from "../components/Button/Button";
import Select from "../components/Select/Select";
import { useNavigate } from "react-router-dom";
import style from "./style.module.scss";
import Validate2FAComponent from '../components/TwoFactorAuth/Validate2FAComponent'

const defaultValues = {
  walletNumber: "",
  network: "",
};



export default function AddWallet() {
  const { handleAddWallet, setOpenModalValidate, is2FAEnabled, openModalValidate, setTempData} = useContext(AuthContext);
  const navigate = useNavigate();
  const options = [
    {label:"Select your network", value: "", id:1},
    {label:"TRC20", value: "TRC20", id:2},
    {label:"ERC20", value: "ERC20", id:3},
    {label:"BSC (BEP20)", value: "BSC (BEP20)", id:4},
    {label:"SOL", value: "SOL", id:5},
  ]
  const addWallet = (data) =>{
    if(is2FAEnabled){
      setTempData(data)
      return setOpenModalValidate(true)
    }
    handleAddWallet(data)
    navigate('/profile')
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
    <>
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
      <Select
        name="network"
        register={register}
        options={options}
        error={Boolean(errors.network)}
        helperText={errors.network?.message}
      />
      
      {/* <select {...register("network")} defaultValue="" error={Boolean(errors.network)}>
        {options.map(option=>{
          if(option.value ===""){
            return <option value={option.value} disabled>{option.label}</option>
          }else{
            return <option value={option.value}>{option.label}</option>
          }
          
          })}

      </select>
      {errors.network && (
        <p className={style.error}>{errors.network.message}</p>
      )} */}
      <Button disabled={isSubmitting} type="submit">
        Submit
      </Button>
    </form>
    {openModalValidate && (
      <Validate2FAComponent
        closeModal={() => setOpenModalValidate(false)}
        action={3}
      />
    )}
    </>
  );
}
