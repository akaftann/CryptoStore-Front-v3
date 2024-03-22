import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import style from "./style.module.scss";
import { AuthContext } from "../context/AuthContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "./validtionSchemas";
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
    title: "Адміністратор",
  },
  {
    id: 2,
    title: "Модератор",
  },
  {
    id: 3,
    title: "Користувач",
  },
];

export default function SignUp() {
  const { handleSignUp } = useContext(AuthContext);
  const [isChecked, setIsChecked] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    resolver: yupResolver(signUpSchema),
  });

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleTermsLinkClick = () => {
    window.open("https://app.websitepolicies.com/policies/view/tw3pc0ql", "_blank");
  };

  const onSubmit = (data) => {
    if (isChecked) {
      handleSignUp(data);
    } else {
      alert("Please accept the terms and conditions.");
    }
  };

  return (
    <>
      <form className={style.wrapper} onSubmit={handleSubmit(onSubmit)}>
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
          type="password"
          name="pass"
          register={register}
          autoComplete="off"
          placeholder="Password"
          error={Boolean(errors.pass)}
          helperText={errors.pass?.message}
        />
        <div className={style.checkboxWrapper}>
          <input
            type="checkbox"
            id="termsCheckbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="termsCheckbox">
          &nbsp; I accept the{" "}
            <span className="cursor-pointer underline italic" onClick={handleTermsLinkClick}>
              terms and conditions
            </span>
          </label>
        </div>
        <Button disabled={isSubmitting || !isChecked} type="submit">
          Sign Up
        </Button>
      </form>
    </>
  );
}
