import React from 'react';

const InvoicePage = () => {
    return (
        <div className='flex md:flex-row flex-col sm:py-16 py-6'>
            <div className='flex justify-center items-start flex-col xl:px-0 sm:px16 px-6 md:w-6/12'>
                <h2 className='flex-1 font-poppins font-semibold ss:text-[25px] text-[25px] ss:leading-[100.8px] leading-[75px]'>Additional info</h2>
                <h2>SEPA</h2>
                <p className='font-poppins font-normal text-[15px] leading-[30.8px]'>1-2 banking days
                1-2 banking days In order to complete your purchase, you must make a transfer through your bank. After making the transfer, it will take around 1 banking day to reach our account. Immediately after we receive your transfer, we will initiate the transfer of your USDT. 
                A market order is an instruction to buy or sell at the best price. These orders are usually executed immediately. While your money is being transferred to In the day, the price of the crypto may fluctuate until In the day completes the order. Your transaction will be processed as soon as the payment is done, and your USDT is available in your wallet.
                Your bank account name must match the name registered to your In the day account. Please note that you must include the reference code exactly when making a bank transfer. If the deposited amount exceeds your daily limit, we will divide the total payment based on your maximum daily limit.</p>
                <p className='font-poppins font-normal text-[15px] leading-[30.8px]'>Your bank account name must match the name registered to your Binance account.Please note that you must include the reference code exactly when making a bank transfer. If the deposited amount exceeds your daily limit, we will divide the total payment based on your maximum daily limit.
                Please note that we do not accept Swift transfers, Please do not use the Swift transfer to make deposit.</p>
            </div>

            <div className='flex-col flex justify-center items-start'>
                <table className='table border'>
                    <tbody className='divide-y divide-gray-200 bg-white'>
                        <tr>
                            <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>IBAN</td>
                            <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>UA213223130000026007233566001</td>
                        </tr>
                        <tr>
                            <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>Company name</td>
                            <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>In the day AB</td>
                        </tr>
                        <tr>
                            <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>BIC</td>
                            <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>some bic</td>
                        </tr>
                        <tr>
                            <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>Company address</td>
                            <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>Kocksgatan 49, Box 560, 116 29 STOCKHOLM</td>
                        </tr>
                        <tr>
                            <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>Bank</td>
                            <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>Some bank</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    )
}
export default InvoicePage;