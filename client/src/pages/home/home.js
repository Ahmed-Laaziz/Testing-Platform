import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import ErrorPage from '../error/404';
import Template from '../../components/templates/template';
const backLink = process.env.REACT_APP_BACK_LINK;

export default function Home() {
  const [token, setToken] = useState('');
  const [showErrorPage, setShowErrorPage] = useState(false); // State to handle delay for ErrorPage
  const [isTokenValid, setIsTokenValid] = useState(false); // State to track token validity
  console.log(token);

  // Function to extract user ID and check if token is expired
  const getUserIdFromToken = (token) => {
    try {
      const decoded = jwtDecode(token);

      // Check if the token has an expiration time
      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        console.error('Token has expired');
        return null;
      }
      return decoded.id; // Assuming "id" is the key used in the token payload
    } catch (error) {
      console.error('Error decoding JWT token:', error);
      return null;
    }
  };

  // Get the user ID from the token
  const userID = getUserIdFromToken(token);
  console.log('userId : ' + userID);

  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the token from localStorage
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      // Set the token in your component state
      setToken(storedToken);
      
      // Validate the token by checking if it has expired
      const decodedToken = getUserIdFromToken(storedToken);
      if (decodedToken) {
        setIsTokenValid(true);
      } else {
        setIsTokenValid(false);
      }
    } else {
      setIsTokenValid(false);
    }

    // If no valid userID, delay the display of ErrorPage by 1 second
    if (!userID) {
      const timer = setTimeout(() => {
        setShowErrorPage(true); // Show ErrorPage after 1-second delay
      }, 1000); // 1000ms = 1 second

      // Cleanup the timer when the component unmounts or userID changes
      return () => clearTimeout(timer);
    }
  }, [userID, navigate]);

  return (
    <div>
      {isTokenValid ? (
        // Render content for logged-in users if the token is valid
        <Template/>
      ) : showErrorPage ? (
        // Show ErrorPage after the delay
        <ErrorPage />
      ) : (
        // Render a placeholder or loading message during the 1-second delay
        <></>
      )}
    </div>
  );
}
