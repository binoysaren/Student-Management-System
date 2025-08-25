import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GoogleLoginButton = ({ buttonText }) => {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        // Send the Google access token to your backend
        const res = await axios.post('http://localhost:5000/auth/google', {
          token: response.access_token
        });
        
        // Store the JWT token received from your backend
        if (res.data.token) {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('user', JSON.stringify(res.data.user));
          
          // Redirect based on role
          switch(res.data.user.role) {
            case 'admin':
              navigate('/admin/dashboard');
              break;
            case 'teacher':
              navigate('/teacher/dashboard');
              break;
            case 'student':
              navigate('/student/dashboard');
              break;
            default:
              navigate('/dashboard');
          }
        }
      } catch (error) {
        console.error('Google login failed:', error);
        alert('Google login failed. Please try again.');
      }
    },
    onError: (error) => {
      console.error('Google Login Error:', error);
      alert('Google login failed. Please try again.');
    },
    flow: 'implicit',
  });

  return (
    <button 
      onClick={() => login()}
      style={{
        backgroundColor: '#4285F4',
        color: 'white',
        border: 'none',
        padding: '10px 15px',
        borderRadius: '4px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        fontSize: '16px',
        width: '100%',
        margin: '10px 0'
      }}
    >
      <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg">
        <path fill="#fff" d="M16.51 8.36v1.47h-1.48v-1.47h1.48zm-6.147 1.47h1.48v-1.47h-1.48v1.47zm4.413-1.47h1.48v1.47h-1.48V8.36zm-2.94 0h1.48v1.47h-1.48V8.36zm-2.94 0h1.48v1.47H9.896V8.36zm-2.94 0h1.48v1.47H6.956V8.36zm-2.94 0h1.48v1.47H4.016V8.36zm11.76-2.94h1.48v1.47h-1.48V5.42zm0-2.94h1.48v1.47h-1.48V2.48zm-2.94 2.94h1.48v1.47h-1.48V5.42zm-2.94 0h1.48v1.47h-1.48V5.42zm-2.94 0h1.48v1.47H9.896V5.42zm-2.94 0h1.48v1.47H6.956V5.42zm-2.94 0h1.48v1.47H4.016V5.42zm0-2.94h1.48v1.47H4.016V2.48zm2.94 0h1.48v1.47H6.956V2.48zm2.94 0h1.48v1.47H9.896V2.48zm2.94 0h1.48v1.47h-1.48V2.48zm2.94 0h1.48v1.47h-1.48V2.48z"/>
        <path fill="#4285F4" d="M3.576 2.48h12.848v12.848H3.576V2.48z"/>
        <path fill="#fff" d="M8.656 12.284l3.888-3.888-3.888-3.888v7.776z"/>
      </svg>
      {buttonText || 'Sign in with Google'}
    </button>
  );
};

export default GoogleLoginButton;