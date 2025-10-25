import React  from "react"
import Header from "./Header/Header";
import { Outlet } from   'react-router-dom';
import { AuthProvider } from "./Home/context";
import Home from "./Home/Home";
import Signin from "./Signin";
import SignUp from "./SignUp";

function Layout(){  // here Header and Home component are common for all the pages so we can put it in Layout component ,only Outlet will change according to the route
    return (
        <AuthProvider>
           <Header/>
           <Outlet/>
        </AuthProvider>
    )
}

export default Layout  