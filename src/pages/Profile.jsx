import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import TwoFactorAuth from "../components/TwoFactorAuth/TwoFactorAuth";
import { AuthContext } from "../context/AuthContext";
import Validate2FAComponent from '../components/TwoFactorAuth/Validate2FAComponent'

const ProfilePage = () => {

const {generateQrCode, disableTwoFactorAuth, is2FAEnabled, setOpenModal,setOpenModalValidate, openModal,openModalValidate, handleDeleteWallet, wallet, network, getWallet} = useContext(AuthContext);
const [action2fa, setAction2fa] = useState(0);
const navigate = useNavigate();
  useEffect(() => {
    getWallet()
  }, []);
  const handleAddWallet = () => {
    console.log('button click')
    navigate('/wallet')
  };

  /* useEffect(() => {
    if (!store.authUser) {
      navigate("/login");
    }
  }, []); */
  
  const deleteWallet = async (data) =>{
    if(is2FAEnabled){
      setAction2fa(2)
      return setOpenModalValidate(true)
    }
    await handleDeleteWallet(data)
  }

  const disable2FA = async () =>{
    setAction2fa(4)
    return setOpenModalValidate(true)
  }

  return (
    <>
      <section className="bg-ct-blue-600  w-full min-h-screen pt-10">
        <div className="max-w-4xl p-12 mx-auto bg-ct-dark-100 rounded-md h-[20rem] flex gap-20 justify-center items-start">
            {wallet && network ?
                (<div className="flex-grow-2">  {/*when there is 2fa block set  w-1/2 */}
                    <h1 className="text-2xl font-semibold">Wallet info</h1>
                    <div className="mt-8">
                    <p className="mb-2">Wallet Number: {wallet}</p>
                    <p className="mb-2">Network: {network}</p>
                    <button type="button"
                        className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-8" onClick={deleteWallet}>
                        Delete
                    </button>
                    </div>
                </div>)
                :
                (
                    <div className="flex-grow-2 "> {/*when there is 2fa block set  w-1/2 */}
                    <h1 className="text-2xl font-semibold">Wallet info</h1>
                        <div className="mt-8">
                        <p className="mb-2">You don't have any wallet yet</p>
                        <button type="button"
                            className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-7" onClick={handleAddWallet}>
                            Add wallet
                        </button>
                    </div>
                </div>
                )
            }
          {/* <div>
            <h3 className="text-2xl font-semibold">
              Mobile App Authentication (2FA)
            </h3>
            <p className="mb-4">
              Secure your account with TOTP two-factor authentication.
            </p>
            {is2FAEnabled ? (
              <button
                type="button"
                className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
                onClick={disable2FA}
              >
                Disable 2FA
              </button>
            ) : (
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
                onClick={() =>
                  generateQrCode()
                }
              >
                Setup 2FA
              </button>
            )}
          </div> */}
        </div>
      </section>
      {openModal && (
        <TwoFactorAuth
          closeModal={() => setOpenModal(false)}
        />
      )}
       {openModalValidate && (
        <Validate2FAComponent
          closeModal={() => setOpenModalValidate(false)}
          action={action2fa}
        />
      )}
    </>
  );
};

export default ProfilePage;
