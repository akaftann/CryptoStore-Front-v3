import { useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import  LoadingButton  from "../components/LoadingButton/LoadingButton.jsx";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { validate2FASchema } from "./validtionSchemas";

const styles = {
  inputField: `form-control block w-full px-4 py-4 text-sm text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`,
};
const Validate2faPage = () => {
const {validate2fa, isUserLogged, requestLoading} = useContext(AuthContext);
const navigate = useNavigate();

const {
    handleSubmit,
    setFocus,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validate2FASchema),
  });

  

  const onSubmitHandler = (values) => {
    validate2fa(values.token);
  };

  useEffect(() => {
    setFocus("token");
  }, [setFocus]);

  /* useEffect(() => {
    if (!isUserLogged) {
      navigate("/sign-in");
    }
  }, []); */

  return (
    <section className="bg-ct-blue-600 min-h-screen grid place-items-center">
      <div className="w-full">
        <h2 className="text-lg text-center mb-4 text-ct-dark-200">
          Verify the Authentication Code
        </h2>
        <form
          onSubmit={handleSubmit(onSubmitHandler)}
          className="max-w-md w-full mx-auto overflow-hidden shadow-lg bg-ct-dark-200 rounded-2xl p-8 space-y-5"
        >
          <h2 className="text-center text-3xl font-semibold text-[#142149]">
            Two-Factor Authentication
          </h2>
          <p className="text-center text-sm">
            Open the two-step verification app on your mobile device to get your
            verification code.
          </p>
          <input
            {...register("token")}
            className={styles.inputField}
            placeholder="Authentication Code"
          />
          <p className="mt-2 text-xs text-red-600">
            {errors.token ? errors.token.message : null}
          </p>

          <LoadingButton
            loading={requestLoading}
            textColor="text-ct-blue-600"
          >
            Authenticate
          </LoadingButton>
          <span className="block text-center">
            <Link to="/sign-in" className="text-ct-blue-600">
              Back to basic login
            </Link>
          </span>
        </form>
      </div>
    </section>
  );
};

export default Validate2faPage;
