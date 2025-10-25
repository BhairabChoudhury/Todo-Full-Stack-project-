
import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import App from './App.jsx'
import Header from './Header/Header.jsx';
import Layout from './Layout.jsx';
import Create from './Home/Create.jsx';
import Home from './Home/Home.jsx';
import SignUp from './SignUp.jsx';
import Signin from './Signin.jsx';
import { AuthProvider } from "./Home/context"; 
import { AuthContext } from './Home/context';



const router = createBrowserRouter(// another process to do create clild routes 
  createRoutesFromElements(
     <Route path='/' element={<Layout/>}>
      <Route index='true' element={<Home/>}/>
      <Route path='SignUp' element={<SignUp/>}/>
      <Route path='Signin' element={<Signin/>}/>
      </Route>
    
)
)

createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
