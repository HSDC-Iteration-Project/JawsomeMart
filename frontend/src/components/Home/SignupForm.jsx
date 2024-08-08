import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as authService from '../../services/authService';

import styles from "./Form.module.css"

const SignupForm = (props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(['']);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConf: '',
  });

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUserResponse = await authService.signup(formData);
      console.log(newUserResponse)
      props.setUser(newUserResponse.user);
      navigate('/marketplace');
    } catch (err) {
      updateMessage(err.message);
    }
  };

  const handleFormSwap = () => {
    navigate('/'); // Adjust this as needed
  };


  const { username, password, passwordConf } = formData;

  const isFormInvalid = () => {
    return !(username && password && password === passwordConf);
  };

  const[isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  }

  useEffect(() => {
    document.body.classList.toggle('darkmode', isDarkMode)
  }, [isDarkMode]);

  return (
    <>
      <div className = {styles.mainContainer}>
        {/* <p>signUp comp{JSON.stringify(props)}</p> */}
 

        <div className={styles.formContainer}>
          <div className = {styles.formHeader}>
            <h1>Sign Up</h1>
            <p>{message}</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className = {styles.inputContainer}>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                name="username"
                onChange={handleChange}
              />
            </div>
            <div className = {styles.inputContainer}>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                name="password"
                onChange={handleChange}
              />
            </div>
            <div className = {styles.inputContainer}>
              <label htmlFor="confirm">Confirm Password:</label>
              <input
                type="password"
                id="confirm"
                value={passwordConf}
                name="passwordConf"
                onChange={handleChange}
              />
            </div>
            <div className = {styles.inputContainer}>
              <button disabled={isFormInvalid()}>Create Account</button>
            </div>
          </form>
        </div>
        <div className={styles.formFooter}>
          <Link to="/">
            <button onClick={handleFormSwap}>Back to Login</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignupForm;
