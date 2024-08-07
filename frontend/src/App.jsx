import { useState, createContext,useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';



import Navbar from './components/Navbar/Navbar';
import Marketplace from './components/Marketplace/Marketplace'
import Cart from './components/Cart/Cart'
import Success from './components/Checkout/Success';
import SigninForm from './components/Home/SigninForm';
import SignupForm from './components/Home/SignupForm';


import * as authService from '../src/services/authService'
import './App.css';


export const AuthedUserContext = createContext(null);


function App() {
  
  const navigate = useNavigate();

  const [user, setUser] = useState(authService.getUser()); // look for an active user

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  useEffect(() => {
    console.log('App user state:', user);
    if (!user) {
      navigate('/')
    }
  }, [user]);
  
  return (
    <>
      <AuthedUserContext.Provider value={user}>
        {/* <Navbar handleSignout={handleSignout}/> */}
        <Navbar handleSignout={handleSignout}/>
        <div className="appContainer">
          <Routes>
            {user ?  (
              <>
                <Route path='/marketplace' element={<Marketplace />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/success' element={<Success />} />
              </> 
            ) : (
              <>
                <Route path="/" element={<SigninForm setUser={setUser} />} />
                <Route path="/signup" element={<SignupForm setUser={setUser} />} />
                
              </>
            )}
            
          </Routes>
        </div>
      </AuthedUserContext.Provider>
    </>
  );
}

export default App;
