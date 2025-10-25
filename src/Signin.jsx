import React, { useState ,useContext} from 'react'
import axios from 'axios'
import { AuthContext } from './Home/context.jsx'
function Signin() {
   const {setToken} = useContext(AuthContext) ;// use createContext 
  // store user input
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  // show message for success or failure
  const [statusMsg, setStatusMsg] = useState("")

  // handle typing in inputs
  const handleChange = (e) => {
    // spread old data + update the current field
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault() // stop page reload

    try {
      // send POST request to backend
      const response = await axios.post("http://localhost:3000/signin", {
        email: formData.email,
        password: formData.password
      })

      // if backend returns a token, store it in localStorage
      // localStorage.setItem("token", response.data.token) // local storage not much secure 
      // use token 
      setToken(response.data.token) ;


      // success message
      setStatusMsg("Signin successful!")

      console.log("Response:", response.data)

    } catch (error) {
      console.error("Signin error:", error)
      setStatusMsg("Signin failed. Please try again.")
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md"
      >

        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Sign In
        </h2>

        {/* email input */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            placeholder="example@gmail.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* password input */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            name="password"
            placeholder="********"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* submit button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Sign In
        </button>

        {/* message area */}
        <div className="mt-4">
          <h2 className="text-center text-lg font-medium text-gray-700">
            {statusMsg}
          </h2>
        </div>

      </form>
    </div>
  )
}

export default Signin
