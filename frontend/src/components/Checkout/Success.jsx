import styles from './Success.module.css';
import * as cartService from '../../services/cartService'

// success component when a user has a successful payment
const Success = () => {
    // set cart as empty once we reach success page
    cartService.update([]);
    return (
        <div className = {styles.body}>
            <div className={styles.container}>
                <div className={styles.successIcon}>&#10004;</div>
                <h1 className = {styles.h1}>Payment Successful!</h1>
                <p className = {styles.p}>Thank you for your purchase. Your payment has been processed successfully.</p>
                <p className = {styles.p}>Order Number: <strong>#123456789</strong></p>
                <a href="/marketplace" className={styles.button}>Go to Homepage</a>
            </div>
        </div>
    )
}

export default Success;
