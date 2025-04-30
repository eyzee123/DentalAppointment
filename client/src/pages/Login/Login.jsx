import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setField, setError, setLoading, clearForm } from '../../redux/slice/loginSlice';
import '../Login/Login.css';
import { loginUser } from '../../service/authService';
import { useNavigate } from 'react-router-dom';
import { login } from '../../redux/slice/authSlice';
import { LOCAL_STORAGE_KEY } from '../../utils/constants/localStorage';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { email, password, error, isLoading } = useSelector(state => state.login);

  const handleInputChange = (field) => (e) => {
    dispatch(setField({ field, value: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      dispatch(setError('Both fields are required'));
      return;
    }

    dispatch(setLoading(true));
    dispatch(setError(''));

    const credentials = {
      email,
      password,
    };

    try {
      const data = await loginUser(credentials); 

      if (data.error) {
        dispatch(setError(data.message || 'Failed to log in. Please try again.'));
      } else {
        dispatch(clearForm());
        console.log('User logged in successfully:', data);

        dispatch(login({ user: data }));
        console.log("userData",data);
        localStorage.setItem(LOCAL_STORAGE_KEY.user, JSON.stringify(data))
        navigate('/');
      }
    } catch (error) {
      dispatch(setError('Error while logging in. Please try again later.'));
    }

    dispatch(setLoading(false));
  };


  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Welcome Back!</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleInputChange('email')}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={handleInputChange('password')}
              required
            />
          </div>
          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? 'Logging In...' : 'Login'}
          </button>
        </form>
        <div className="signup-link">
          <p>Don't have an account? <a href="/signup">Sign up</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
