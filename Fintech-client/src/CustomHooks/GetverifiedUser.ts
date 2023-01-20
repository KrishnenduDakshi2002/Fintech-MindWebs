import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { HOST } from '../Host';
import { useNavigate } from 'react-router-dom';

export default function useVerfiyUser(){
    const [isAuthorized, setIsAuthorized] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
      axios.get(`${HOST}/verifytoken`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }).catch(e=>{
        if(e.response.status === 401 && e.response.statusText === "Unauthorized"){
            localStorage.removeItem('authToken');
            navigate('/login');
          }
      })
    }, [])
  
  }