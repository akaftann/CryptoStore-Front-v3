import { useForm } from "react-hook-form";
import style from "./style.module.scss";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "./validtionSchemas";
import Field from "../components/Field/Field";
import Button from "../components/Button/Button";
import { useNavigate } from "react-router-dom";
import Validate2FAComponent from '../components/TwoFactorAuth/Validate2FAComponent'

const defaultValues = {
  email: "",
  pass: "",
};

export default function SignIn() {
  const navigate = useNavigate()
  const { handleSignIn , setOpenModalValidate, openModalValidate} = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    resolver: yupResolver(signInSchema),
  });

  return (
    <>
    <form onSubmit={handleSubmit(handleSignIn)} className={style.wrapper}>
      <h2>Log in</h2>
      <Field
        name="email"
        register={register}
        autoComplete="off"
        placeholder="User's email"
        error={Boolean(errors.email)}
        helperText={errors.email?.message}
      />
      <Field
        name="pass"
        register={register}
        autoComplete="off"
        placeholder="Password"
        error={Boolean(errors.pass)}
        helperText={errors.pass?.message}
      />
      <Button disabled={isSubmitting} type="submit">
        Log In
      </Button>
    </form>
    {openModalValidate && (
        <Validate2FAComponent
          closeModal={() => setOpenModalValidate(false)}
          action={1}
        />
      )}
    </>
  );
}
