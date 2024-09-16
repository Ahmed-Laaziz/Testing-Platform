import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import ErrorPage from '../error/404';
import DashboardLayoutBasic from '../../components/templates/template';
import DataTable from '../../components/tables/processes/dataTable';  // Import the table

const backLink = process.env.REACT_APP_BACK_LINK;

export default function Home() {
  const [token, setToken] = useState('');
  const [showErrorPage, setShowErrorPage] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);

  const getUserIdFromToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        console.error('Token has expired');
        return null;
      }
      return decoded.id;
    } catch (error) {
      console.error('Error decoding JWT token:', error);
      return null;
    }
  };

  const userID = getUserIdFromToken(token);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      const decodedToken = getUserIdFromToken(storedToken);
      if (decodedToken) {
        setIsTokenValid(true);
      } else {
        setIsTokenValid(false);
      }
    } else {
      setIsTokenValid(false);
    }

    if (!userID) {
      const timer = setTimeout(() => setShowErrorPage(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [userID, navigate]);

  return (
    <div>
      {isTokenValid ? (
        <DashboardLayoutBasic component={DataTable} />  // Pass the table component when rendering the dashboard
      ) : showErrorPage ? (
        <ErrorPage />
      ) : (
        <></>
      )}
    </div>
  );
}
