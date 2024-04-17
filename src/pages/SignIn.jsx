import { useForm } from "react-hook-form";
import style from "./style.module.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "./validtionSchemas";
import Field from "../components/Field/Field";
import Button from "../components/Button/Button";
import { useNavigate } from "react-router-dom";
import Validate2FAComponent from '../components/TwoFactorAuth/Validate2FAComponent'
import { EyeInvisibleOutlined, EyeOutlined} from '@ant-design/icons'
import styles from '../style';

const defaultValues = {
  email: "",
  pass: "",
};

export default function SignIn() {
  const [visible, setVisible] = useState(false);
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
  const visibleHandler = () => {
    setVisible(!visible)
  }

  return (
    
    <section id="home" className={`md:flex-row flex-col ${styles.paddingY}`}>
    <form onSubmit={handleSubmit(handleSignIn)} className={style.wrapper}>
      <h1 className="text-white text-center">Log in</h1>
      <Field
        type="text"
        name="email"
        register={register}
        autoComplete="off"
        placeholder="User's email"
        error={Boolean(errors.email)}
        helperText={errors.email?.message}
      />
      <Field
        type={visible? "text" : "password"}
        name="pass"
        register={register}
        autoComplete="off"
        placeholder="Password"
        error={Boolean(errors.pass)}
        helperText={errors.pass?.message}
        visible={visible}
        visibleHandler={visibleHandler}
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
      </section>
    
  );
}
