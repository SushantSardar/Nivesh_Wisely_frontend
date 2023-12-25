
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const fallbackRoutes = ["/signup", "/"];

const ProtectedRoute = ({ path, element }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('loginSession')
    if(token && fallbackRoutes.includes(path)){
      navigate("/sendCall");
    } else if (!token && !fallbackRoutes.includes(path)) {

      navigate("/");
    }
  }, []);

  return element;
};


export default ProtectedRoute;
