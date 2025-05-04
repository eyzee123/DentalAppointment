import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setError, setLoading, clearForm, setFormData } from '../../redux/slice/userSlice';
import '../Signup/Signup.css';
import { registerUser } from '../../service/authService';
import { useNavigate } from 'react-router-dom';
import UserForm from '../../components/forms/UserForm/UserForm';

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { formData, loading, error } = useSelector(state => state.user);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFormData({ field: name, value }));
  };

  const handleSubmit  = async (e) => {
    e.preventDefault();

    dispatch(setLoading(true));
    dispatch(setError(''));


    try {
        const data = await registerUser(formData);
  
        if (data.error) {
          dispatch(setError(data.message || 'Failed to sign up. Please try again.'));
        } else {
          dispatch(clearForm());
          console.log('User signed up successfully:', data);
           navigate('/login');
        }
      } catch (error) {
        dispatch(setError('Error while signing up. Please try again later.'));
      }

    dispatch(setLoading(false));
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>Create an Account</h2>
        {error && <p className="error-message">{error}</p>}
        <UserForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          loading={loading}
        />
        <div className="login-link">
          <p>Already have an account? <a href="/login">Login</a></p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
