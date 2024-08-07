// checkout component
import { useState, useEffect } from "react";
import styles from './Checkout.module.css';

const ProductDisplay = () => (
<body className = {styles.body}>
  <section className = {styles.section} >
    <div className={styles.product}>
      <img className = {styles.checkoutImg}
        src="https://i.imgur.com/EHyR2nP.png"
        alt="The cover of Stubborn Attachments"
      />
      <div className={styles.description}>
      <h3 className={styles.h3} >Stubborn Attachments</h3>
      <h5 className={styles.h5} >$20.00</h5>
      </div>
    </div>
    <form action="/api/create-checkout-session" method="POST">
      <button className = {styles.button} type="submit">
        Checkout
      </button>
    </form>
  </section>
</body>
);

const Message = ({ message }) => (
  <section>
    <p className = {styles.checkoutP} >{message}</p>
  </section>
);

function Checkout() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return message ? (
    <Message message={message} />
  ) : (
    <ProductDisplay />
  );
}

export default Checkout;