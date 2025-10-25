import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css' 
import Header from './Header/Header.jsx'
import SignUp from './SignUp.jsx'
import Signin from './Signin.jsx'
import Home from './Home/Home.jsx'
import { AuthContext } from './Home/context.jsx'
import { AuthProvider } from "./Home/context";

 function App(){
  return (
   <AuthProvider>
    <Home/>
   </AuthProvider>
  )
}

export default App

