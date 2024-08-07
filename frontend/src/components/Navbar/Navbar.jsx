/* =======================================================
Imports
=======================================================*/

// import { Link } from 'react-router-dom';

import { Link } from 'react-router-dom';
import { AuthedUserContext } from '../../App';
import { useContext } from 'react';
import styles from "./Navbar.module.css";
import logo from '../../assets/icons8-shop-96.png'; // Import the image


/* =======================================================
Helper Functions
=======================================================*/

/* =======================================================
Component
=======================================================*/

function Navbar({handleSignout}) {
  /*--------------- States/Hooks ---------------*/
  const user = useContext(AuthedUserContext);

  /*--------------- Return ---------------*/

  return (
    <>
      <nav>
        {/* <h3>nav bar</h3> */}
        <div className={styles.navContainer}>
          <div className={styles.navLeft}>
            <img src={logo} alt="LOGO"/>
          </div>
          {user ? (
          <div className={styles.navRight}>          
            
              <li><Link to='/cart'>My Cart</Link></li>
              <li><Link to="/Marketplace">Marketplace</Link></li>
              <li><Link to='/checkout'>Checkout</Link></li>
              <li><Link to='' onClick={handleSignout}>Sign Out</Link></li>
          
          </div>
          ) : (
          <div className={styles.navRight}>          
              <li><Link to="/">Log In</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>  
          </div>
          )}

       </div>
      </nav>
      
    </>
  );
}

export default Navbar;


