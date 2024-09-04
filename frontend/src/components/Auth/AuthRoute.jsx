import React from 'react'
import { GetUserFromStore } from '../../utils/getUsersFromStorage';
import { Navigate } from 'react-router-dom';



const AuthRoute = ({children}) => {

    const token = GetUserFromStore()
    const isLogin = false;
  if(token){
    return children
  }else {
    return <Navigate to='/login'/>
  }
    
  
}

export default AuthRoute