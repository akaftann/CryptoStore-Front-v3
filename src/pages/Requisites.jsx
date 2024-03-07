import React from 'react';
import style from "./style.module.scss";

const handleCopyToClipboard = () => {
    navigator.clipboard.writeText()
      .then(() => alert(`Text copied`))
      .catch((err) => console.error('Copy error:', err));
  };

  const styles = {
    container: {
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    },
    section: {
      marginBottom: '20px',
    },
    requisite: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '10px',
    },
    amountSection: {
      border: '1px solid #ccc',
      padding: '10px',
    },
  };

const InvoicePage = () => {
  return (
    <div className={style.wrapper}>
      <div style={styles.section}>
        <h2>Requisites</h2>
        <div style={styles.requisite}>
          <p>IBAN: some number</p>
          <button onClick={() => handleCopyToClipboard('some number')}>Copy</button>
        </div>
        <div style={styles.requisite}>
          <p>BIC: some number</p>
          <button onClick={() => handleCopyToClipboard('some number')}>Copy</button>
        </div>
        <div style={styles.requisite}>
          <p>Company name: In the day AB</p>
          <button onClick={() => handleCopyToClipboard('In the day AB')}>Copy</button>
        </div>
        <div style={styles.requisite}>
          <p>Company address:</p>
          <p>Kocksgatan 49, Box 560</p>
          <p>116 29 STOCKHOLM</p>
          <button onClick={() => handleCopyToClipboard('Kocksgatan 49, Box 560, 116 29 STOCKHOLM')}>Copy</button>
        </div>
        <div style={styles.requisite}>
          <p>Bank: some bank</p>
          <button onClick={() => handleCopyToClipboard('some bank')}>Copy</button>
        </div>
      </div>

      <div style={styles.section}>
        <h2>SEPA</h2>
        <p>1-2 banking days</p>

        <p>
          In order to complete your purchase, you must make a transfer through your bank.
        </p>

        <p>
          After making the transfer, it will take around 1 banking day to reach our account.
        </p>

        <p>
          Immediately after we receive your transfer, we will initiate the transfer of your USDT.
        </p>

        <p>
          A market order is an instruction to buy or sell at the best price. These orders are usually executed
          immediately. While your money is being transferred to In the day, the price of the crypto may fluctuate
          until In the day completes the order.
        </p>

        <p>Your transaction will be processed as soon as the payment is done, and your USDT is available in your wallet.</p>
      </div>

      <div style={styles.section}>
        <h2>Cryptocurrency</h2>
        <p>USDT Coin (USDT)</p>
        <p>1 USDT ≈ 0.93 EUR</p>

        <div style={styles.amountSection}>
          <h3>Amount to buy</h3>
          <p>1000 EUR</p>
          <p>≈ 1043 USDT</p>
          <p>includes fee 3%</p>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;
