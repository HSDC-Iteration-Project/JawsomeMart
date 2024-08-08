import { useState, createContext, useEffect } from 'react';
// import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import AuthCallback from './auth/AuthCallback';
import Navbar from './components/Navbar/Navbar';
import Marketplace from './components/Marketplace/Marketplace';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';
import SigninForm from './components/Home/SigninForm';
import SignupForm from './components/Home/SignupForm';

import * as authService from '../src/services/authService';
import './App.css';

export const AuthedUserContext = createContext(null);

//github client id
const ClIENT_ID ='Ov23liWbQ8kufW9ONo0S';

function App() {
  const navigate = useNavigate();
  //rerender

  const [rerender, setRerender] = useState(false)
  const [userData, setUserData] = useState({})
  const ThemeContext = createContext();
  const [isDarkMode, setIsDarkMode] = useState(false)
  const location = useLocation();

  // const [user, setUser] = useState(authService.getUser()); // look for an active user
  const [user, setUser] = useState(null); // Initialize with null

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      async function fetchUserData() {
        try {
          const response = await fetch('http://localhost:8080/getUserData', {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const data = await response.json();
          setUser(data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
      fetchUserData();
    }
  }, []);

  const handleSignout = () => {
    authService.signout();
    setUser(null);
    localStorage.removeItem('accessToken');
    navigate('/');
  };

  useEffect(() => {
    console.log('App user state:', user);
    // if (!user && location.pathname !== '/') {
      if (user === null && location.pathname !== '/') {
      navigate('/');
    }
  }, [user, navigate, location]);


  useEffect(() => {
    const codeParam = new URLSearchParams(window.location.search).get('code');
    if (codeParam && !localStorage.getItem('accessToken')) {
      async function getAccessToken() {
        try {
          const response = await fetch(`http://localhost:8080/getAccessToken?code=${codeParam}`);
          const data = await response.json();
          if (data.access_token) {
            localStorage.setItem('accessToken', data.access_token);
            setRerender(prev => !prev);
          }
        } catch (error) {
          console.error('Error fetching access token:', error);
        }
      }
      getAccessToken();
    }
  }, []);
  // useEffect(() => {
  //   const queryString = window.location.search;
  //   const urlParams = new URLSearchParams(queryString);
  //   const codeParam = urlParams.get('code');
  //   console.log('GitHub code:', codeParam);

  //   if (codeParam && (localStorage.getItem('accessToken') === null )) {
  //     async function getAccessToken() {
  //       await fetch("http://localhost:8080/getAccessToken?code=" + codeParam, {
  //         method: 'GET',
  //       }).then((response) => {
  //         return response.json();
  //       }).then((data) => {
  //         console.log(data);
  //         if (data.access_token) {
  //           localStorage.setItem("accessToken", data.access_token);
  //           console.log('Token in localStorage:', localStorage.getItem('accessToken'));
  //           setRerender(!rerender);
  //         }
  //       })
  //     }
  //     getAccessToken();     
  //   }
  // },[]);

  // useEffect(() => {
  //   const queryString = window.location.search;
  //   const urlParams = new URLSearchParams(queryString);
  //   const codeParam = urlParams.get('code');
  //   console.log('GitHub code:', codeParam);
  
  //   if (codeParam && !localStorage.getItem('accessToken')) {
  //     async function getAccessToken() {
  //       try {
  //         const response = await fetch(`http://localhost:8080/getAccessToken?code=${codeParam}`, {
  //           method: 'GET',
  //         });
  
  //         if (!response.ok) {
  //           const errorText = await response.text();
  //           console.error('Server error:', errorText);
  //           throw new Error(`Server error: ${response.status} ${response.statusText}`);
  //         }
  
  //         const data = await response.json();
  //         console.log('Access token response:', data);
  
  //         if (data.access_token) {
  //           localStorage.setItem('accessToken', data.access_token);
  //           console.log('Token in localStorage after setting:', localStorage.getItem('accessToken'));
  //           setRerender(prev => !prev); // Ensure rerender toggles correctly
  //         } else {
  //           console.error('Access token not found in response:', data);
  //         }
  //       } catch (error) {
  //         console.error('Error fetching access token:', error);
  //       }
  //     }
  
  //     getAccessToken();
  //   }
  // }, [navigate]);

  // async function getUserData () {
  //   await fetch("http://localhost:8080/getUserData", {
  //     method: "GET",
  //     headers: {
  //       "Authorization" : "Bearer " + localStorage.getItem("accessToken")
  //     }
  //   }).then((response) => {
  //     return response.json();
  //   }).then((data) => {
  //     console.log(data)
  //   })
  // }

  async function getUserData() {
    try {
      const response = await fetch('http://localhost:8080/getUserData', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      const data = await response.json();
      console.log(data);
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  // function loginGithub() {
  //   window.location.assign("https://github.com/login/oauth/authorize?client_id=" + ClIENT_ID);
  // }

  // function loginGithub() {
  //   const redirectUri = encodeURIComponent(window.location.origin + '/auth/callback');
  //   // window.location.assign(`https://github.com/login/oauth/authorize?client_id=${ClIENT_ID}&redirect_uri=${redirectUri}`);
  //   window.location.assign(`localho`)
  // }

  function loginGithub() {
    const redirectUri = encodeURIComponent(window.location.origin + '/auth/callback');
    const clientId = 'Ov23liWbQ8kufW9ONo0S'; 
    window.location.assign(`https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`);
  }

  return (
      <>
      <AuthedUserContext.Provider value={user}>
        <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
          {/* <Navbar handleSignout={() => { authService.signout(); setUser(null); }} /> */}
          {/* <Navbar handleSignout={() => { authService.signout(); setUser(null); localStorage.removeItem('accessToken'); navigate('/'); }} /> */}
          <Navbar handleSignout={() => { 
          localStorage.removeItem('accessToken');
          setUser(null);
          navigate('/');
        }} />
          <div className="appContainer">
            <Routes>
              {user ? (
                <>
                  <Route path='/marketplace' element={<Marketplace />} />
                  <Route path='/cart' element={<Cart />} />
                  <Route path='/checkout' element={<Checkout />} />
                </>
              ) : (
                <>
                  <Route path='/' element={<SigninForm setUser={setUser} />} />
                  <Route path='/signup' element={<SignupForm setUser={setUser} />} />
                  <Route path='/auth/callback' element={<AuthCallback />} />
                </>
              )}
              {/* <Route path='/auth/callback' element={<AuthCallback />} /> */}
            </Routes>
            {/* {!localStorage.getItem('accessToken') && location.pathname === '/' && (
              <button id="gitButton" onClick={loginGithub}>Login with GitHub</button>
            )}
            {localStorage.getItem('accessToken') && (
              <button onClick={() => localStorage.removeItem('accessToken')}>Logout</button>
            )} */}

          {/* {!localStorage.getItem('accessToken') && location.pathname === '/' && (
            <button id="gitButton" onClick={loginGithub}>Login with GitHub</button>
          )}
          {localStorage.getItem('accessToken') && (
            <button onClick={() => { authService.signout(); setUser(null); localStorage.removeItem('accessToken'); navigate('/'); }}>Logout</button>
          )} */}

          {!localStorage.getItem('accessToken') && location.pathname === '/' && (
            <button id="gitButton" onClick={loginGithub}>Login with GitHub</button>
          )}
          {localStorage.getItem('accessToken') && (
            <button onClick={() => { 
              localStorage.removeItem('accessToken'); 
              setUser(null); 
              navigate('/'); 
            }}>Logout</button>
          )}
            
          </div>
        </ThemeContext.Provider>
      </AuthedUserContext.Provider>
    </>
);
}

export default App;
