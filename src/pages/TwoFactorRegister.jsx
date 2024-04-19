import { useEffect, useState, useContext } from "react";
import QRCode from "qrcode";
import { useForm } from "react-hook-form";
import { object, string } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthContext } from "../context/AuthContext";
import styles from '../style';

const style = {
  heading3: `text-xl font-semibold text-gray-900 p-4 border-b`,
  heading4: `text-base text-ct-blue-600 font-medium border-b mb-2`,
  modalOverlay: `overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full`,
  orderedList: `space-y-1 text-sm list-decimal`,
  buttonGroup: `flex items-center py-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600`,
  buttonBlue: `text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`,
  buttonGrey: `text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600`,
  inputField: `bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/5 p-2.5`,
};

const twoFactorAuthSchema = object({
  token: string().min(1, "Authentication code is required"),
});

const TwoFactorAuthRegister = () => {
  const {verifyOtpRegister, secret, generateQrCode} = useContext(AuthContext);
  const [qrcodeUrl, setqrCodeUrl] = useState("");
  const {
    handleSubmit,
    register,
    formState: { errors },
    setFocus,
  } = useForm({
    resolver: zodResolver(twoFactorAuthSchema),
  });

  const onSubmitHandler = (values) => {
    verifyOtpRegister(values.token);
  };

  

  useEffect(() => {
    const loadQr = async()=>{
      const {base32, otpAuthUrl} = await generateQrCode()
      QRCode.toDataURL(otpAuthUrl).then(setqrCodeUrl);
    }
    loadQr()
  }, []);

  

  return (
    
    <div className="max-w-4xl mx-auto bg-ct-dark-100 rounded-md flex gap-20 justify-center items-start mt-5 mb-10">
      <div className="relative p-4 w-full  ">
        <div className="relative bg-white rounded-lg shadow text-center">
          <h3 className={style.heading3}>Two-Factor Authentication (2FA)</h3>
          {/* Modal body */}
          <div className="p-6 space-y-4">
            <h4 className={style.heading4}>
              Configuring Google Authenticator or Authy
            </h4>
            <div className={style.orderedList}>
              <li>
                Install Google Authenticator (IOS - Android) or Authy (IOS -
                Android).
              </li>
              <li>In the authenticator app, select "+" icon.</li>
              <li>
                Select "Scan a barcode (or QR code)" and use the phone's camera
                to scan this barcode.
              </li>
            </div>
            <div>
              <h4 className={style.heading4}>Scan QR Code</h4>
              <div className="flex justify-center">
                <img
                  className="block w-64 h-64 object-contain"
                  src={qrcodeUrl}
                  alt="qrcode url"
                />
              </div>
            </div>
            <div>
              <h4 className={style.heading4}>Or Enter Code Into Your App</h4>
              <p className="text-sm">SecretKey: {secret.base32} (Base32 encoded)</p>
            </div>
            <div>
              <h4 className={style.heading4}>Verify Code</h4>
              <p className="text-sm">
                For changing the setting, please verify the authentication code:
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmitHandler)} className="flex flex-col items-center">
              <input
                {...register("token")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/4 p-2.5"
                placeholder="Authentication Code"
              />
              <p className="mt-2 text-xs text-red-600">
                {errors.token ? errors.token.message : null}
              </p>

              <div className={style.buttonGroup}>
                <button type="submit" className={style.buttonBlue}>
                  Verify & Activate
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default TwoFactorAuthRegister;
