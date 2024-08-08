import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as authService from '../../services/authService'

import styles from "./Form.module.css"

const SigninForm = (props) => {
    const navigate = useNavigate();
    const [message, setMessage] = useState(['']);
    const [formData, setFormData] = useState({
      username: '',
      password: '',
    });
  
    const updateMessage = (msg) => {
      setMessage(msg);
    };
  
    const handleChange = (e) => {
      updateMessage('');
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => { 
      e.preventDefault(e)

      console.log('submit')
      try {
        const user = await authService.signin(formData);
        console.log(user);
        props.setUser(user);
        navigate('/marketplace');
      } catch (err) {
        updateMessage(err.message);
      }
    };

    const handleFormSwap = () => {
      navigate('/signup'); // Adjust this as needed
    };

    const[isDarkMode, setIsDarkMode] = useState(false);

  // useEffect(() => {
  //   document.body.classList.toggle('darkmode', isDarkMode)
  // }, [isDarkMode]);
  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  }

  useEffect(() => {
    document.body.classList.toggle('darkmode', isDarkMode)
  }, [isDarkMode]);

    return (
      
      <>
      
        <div className = {styles.mainContainer}>

        <button id = "theme-switch" onClick={toggleTheme}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Z"/></svg>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-280q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Z"/></svg>
        </button>

          <div className={styles.formContainer}>
              <div className = {styles.formHeader}>

                <h1>Log In</h1>
                <p>{message}</p>
              </div>
              <form autoComplete="off" onSubmit={handleSubmit}>
                <div className = {styles.inputContainer}>
                  <label htmlFor="username">Username:</label>
                  <input
                    type="text"
                    autoComplete="off"
                    id="username"
                    value={formData.username}
                    name="username"
                    onChange={handleChange}
                  />
                </div>
            
                <div className = {styles.inputContainer}>
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  autoComplete="off"
                  id="password"
                  value={formData.password}
                  name="password"
                  onChange={handleChange}
                />
              </div>
              <div className = {styles.inputContainer}>
                <button>Log In</button>
              </div>
            </form>
          </div>
          <div className={styles.formFooter}>
            <p>Need an account?</p>
            <button onClick={handleFormSwap}> Sign Up</button>    
          </div>
        </div>
      </>
    );
  };
  
  export default SigninForm;