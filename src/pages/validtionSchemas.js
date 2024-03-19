import * as Yup from "yup";

export const signInSchema = Yup.object({
  email: Yup.string()
    .required("Email is a required field!")
    .email("Invalid email address")
    .max(50, "Maximum length is 50 characters"),
  pass: Yup.string()
    .required("Password is a required field!")
    .min(7, "Password must be at least 7 characters")
    .matches(/^(?=.*[A-Z])(?=.*[0-9])/, "Password must contain at least one uppercase letter and one digit")
    .max(50, "Maximum length is 50 characters"),
});

export const signUpSchema = Yup.object({
  email: Yup.string()
    .required("Email is a required field!")
    .email("Invalid email address")
    .max(50, "Maximum length is 50 characters"),
  pass: Yup.string()
    .required("Password is a required field!")
    .min(7, "Password must be at least 7 characters")
    .matches(/^(?=.*[A-Z])(?=.*[0-9])/, "Password must contain at least one uppercase letter and one digit")
    .max(50, "Maximum length is 50 characters"),
});

export const addWalletSchema = Yup.object({
  walletNumber: Yup.string()
    .required("Wallet number is a required field!")
    .max(50, "Maximum length is 50 characters"),
  network: Yup.string()
    .required("Network is a required field!")
    .max(50, "Maximum length is 50 characters"),
});


export const validate2FASchema = Yup.object({
  token: Yup.string()
    .required("Authentication code is required!")
});