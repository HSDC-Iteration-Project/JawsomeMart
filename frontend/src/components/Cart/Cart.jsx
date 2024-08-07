/* =======================================================
Imports
=======================================================*/

import { useState, createContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import * as authService from '../../services/authService';
import * as cartService from '../../services/cartService';
import styles from './Cart.module.css';
import data from '../../../../testdb.json';

/* =======================================================
Helper Functions
=======================================================*/

// calculate the total of the items in the product list
const calculateTotal = (arr) => {
  let total = 0;
  arr.forEach((item) => {
    total += Number(item.price.toFixed(2)) * (item.quantity || 1);
  });
  return total;
};

const calculateTotalQuantity = (arr) => {
  let totalQuantity = 0;
  arr.forEach((item) => {
    totalQuantity += item.quantity;
  });
  return totalQuantity;
};

/* =======================================================
Component
=======================================================*/

function Cart() {
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [orderPlacedMessage, setOrderPlacedMessage] = useState('');
  const [numItems, setNumItems] = useState(0);
  // const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      const data = await cartService.index();
      const cartWithQuantities = data.products.map((item) => ({
        ...item,
        quantity: item.quantity || 1,
      }));
      setCart(cartWithQuantities);
      setCartTotal(calculateTotal(cartWithQuantities));
      setNumItems(calculateTotalQuantity(cartWithQuantities));
      // setCart(data.products);
      // setCartTotal(calculateTotal(data.products));
    };
    fetchCart();
  }, []);

  useEffect(() => {
    setCartTotal(calculateTotal(cart));
    setNumItems(calculateTotalQuantity(cart));
  }, [cart]);

  const removeItem = (id) => {
    const index = cart.findIndex((item) => item.id === id);
    if (index !== -1) {
      const newCart = [...cart];
      newCart.splice(index, 1);
      cartService.update(newCart);
      setCart(newCart);
    }
  };

  const handleIncrement = (id) => {
    const newCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(newCart);
  };

  const handleDecrement = (id) => {
    const newCart = cart.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(newCart);
  };

  //handleCheckout is no irrelavent with the place order button routing back to stripeapi's page
  // const handleCheckout = () => {
  //   cartService.order(cart);
  //   setOrderPlacedMessage('Your order has been placed!');
  //   setCart([])
  // }

  return (
    <>
      <div className={styles.cartContainer}>
        {/* <button onClick={createCart}>Create Cart</button> */}

        <div className={styles.totalContainer}>
          <div className={styles.totalDetails}>
            <div></div>
            <div></div>
            <h2>Order Total:</h2>
            <h2>${(cartTotal * 1.05).toFixed(2)}</h2>
            <p>Items({numItems})</p>
            <p>${cartTotal.toFixed(2)}</p>
            <p>Estimated Tax</p>
            <p>${(cartTotal * 0.05).toFixed(2)}</p>
          </div>

          <h2>{orderPlacedMessage}</h2>
          {cart.length > 0 && (
            <form action='/api/create-checkout-session' method='POST'>
              <button type='submit'>Place Order</button>
            </form>
          )}
        </div>

        <div className={styles.cart}>
          <h2>Cart Items</h2>

          {cart.length > 0 ? (
            cart.map((item, ind) => (
              <div className={styles.itemContainer} key={ind}>
                <div className={styles.itemCard}>
                  <div className={styles.imgContainer}>
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className={styles.itemDetails}>
                    <p>{item.title}</p>
                    <p>Price: ${item.price.toFixed(2)}</p>
                    <></>
                    <div className='counter'>
                      Quantity:
                      <button
                        onClick={() => handleDecrement(item.id)}
                        className='counter-btn'
                      >
                        -
                      </button>
                      <span className='counter-value'>{item.quantity}</span>
                      <button
                        onClick={() => handleIncrement(item.id)}
                        className='counter-btn'
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className={styles.buttonContainer}>
                  {/* <button onClick={() => addItem(item)}>Add</button> */}
                  <button onClick={() => removeItem(item.id)}>Remove</button>
                </div>
              </div>
            ))
          ) : (
            <h4>Add items to your cart! Visit our marketplace</h4>
          )}
        </div>
      </div>
    </>
  );
}

export default Cart;
