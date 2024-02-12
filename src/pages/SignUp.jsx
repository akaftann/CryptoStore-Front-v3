import { useForm, Controller } from "react-hook-form";
import style from "./style.module.scss";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "./validtionSchemas";
import Select from "../components/Select/Select";
import Field from "../components/Field/Field";
import Button from "../components/Button/Button";

const defaultValues = {
  email: "",
  pass: "",
  role: 1,
};

const rolesList = [
  {
    id: 1,
    title: "Администратор",
  },
  {
    id: 2,
    title: "Модератор",
  },
  {
    id: 3,
    title: "Пользователь",
  },
];

export default function SignUp() {
  const { handleSignUp, activationLink } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    resolver: yupResolver(signUpSchema),
  });

  return (
    <form className={style.wrapper} onSubmit={handleSubmit(handleSignUp)}>
      <h2>Create account</h2>
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
      {/* <Controller
        control={control}
        name="role"
        render={({ field: { onChange, value } }) => (
          <Select onChange={onChange} value={value} options={rolesList} />
        )}
      /> */}
      <Button disabled={isSubmitting} type="submit">
        Sign Up
      </Button>
    </form>
  );
}
