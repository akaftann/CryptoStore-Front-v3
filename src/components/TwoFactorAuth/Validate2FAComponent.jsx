import { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { object, string } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthContext } from "../../context/AuthContext";
import LoadingButton from "../LoadingButton/LoadingButton";
import { useNavigate } from "react-router-dom";


const styles = {
  heading3: `text-xl font-semibold text-gray-900 p-4 border-b`,
  heading4: `text-base text-ct-blue-600 font-medium border-b mb-2`,
  modalOverlay: `overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full`,
  orderedList: `space-y-1 text-sm list-decimal`,
  buttonGroup: `flex items-center py-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600`,
  buttonBlue: `text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`,
  buttonGrey: `text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600`,
  inputField: `bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-5CE1E6 block w-full p-2.5`,
};

const twoFactorAuthSchema = object({
  token: string().min(1, "Authentication code is required"),
});

const Validate2FAComponent = ({closeModal, action}) => {
  const {validate2fa, requestLoading, tempData, userId, completeSignIn, actions} = useContext(AuthContext);
  const {
    handleSubmit,
    register,
    formState: { errors },
    setFocus,
  } = useForm({
    resolver: zodResolver(twoFactorAuthSchema),
  });
  const navigate = useNavigate();

  const onSubmitHandler = async (values) => {
   const isValidate =  await validate2fa(values.token, userId);
   if(isValidate){
    switch(action){
      case 1:
        console.log('case 1')
        actions[1](tempData)
        break
      case 2:
        console.log('case 2')
        actions[2]()
        break
      case 3:
        console.log('case 3')
        actions[3](tempData)
        navigate('/profile')
        break
      case 4:
        console.log('case 4')
        actions[4]()
     }
     closeModal()
   }
   
  };


  useEffect(() => {
    setFocus("token");
  }, [setFocus]);

  return (
    <div
      aria-hidden={true}
      className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full bg-opacity-50"
      // onClick={closeModal}
    >
      <div className="relative px-4 mt-20 w-full max-w-xl h-full md:h-auto left-1/2 -translate-x-1/2">
        <div className="relative bg-white rounded-lg shadow">
        <h2 className="text-lg text-center mb-4">
          Verify the Authentication Code
        </h2>
          {/* Modal body */}
          <form
          onSubmit={handleSubmit(onSubmitHandler)}
          className="max-w-md w-full mx-auto overflow-hidden shadow-lg bg-ct-dark-200 rounded-2xl p-8 pb-20 mb-5 space-y-5"
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
          <button
                  type="button"
                  onClick={closeModal}
                  className={styles.buttonGrey}
                >
                  Close
                </button>
          </span>
        </form>
        </div>
      </div>
    </div>
    
  );
};

export default Validate2FAComponent;
