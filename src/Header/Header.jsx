import React from 'react'

 import {Link,NavLink} from 'react-router-dom' 

export default function Header() {
    return (
        <header className="shadow stiry z-50 top-0">
            <nav className="bg-white border-blue-200 px-4 lg:px-6 py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                      <div className=' flex justify-center text-4xl'>
                       Todo List 
                      </div>
                    <div className="flex items-center lg:order-2">
                         <Link
                            to="/"
                            className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            Home
                        </Link>
                        <Link
                            to="/SignUp"
                           className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            sign Up 
                        </Link>

                        <Link
                            to="/Signin"
                            className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            sing in 
                        </Link>
                    </div>
                   
                </div>
            </nav>
        </header>
    );
} 