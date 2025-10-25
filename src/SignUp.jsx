import react from 'react' 
import axios from 'axios'
import { useState } from 'react'
  
function SignUp() {
  const [formData,setFormData] = useState({

    email:"",
    password:"",
     name:""
  })
  const [statusmsg,setStatusmsg] =useState("");// for text for valid or not 
  const handleChange =(e)=>{
      setFormData({...formData,[e.target.name]:e.target.value})
  }

  const   handleSubmit= async(e)=>{
   e.preventDefault();// prevent th ererender the page 
   try{
      const response = await axios.post('http://localhost:3000/signup',{// body of request 
      email:formData.email,
      password:formData.password,
      name:formData.name 
     })
      const message =response.data.message ;
  console.log(message) ;
  setStatusmsg(message); 
   }catch(error){ 
       console.error("Signup error:", error);
      setStatusmsg("Signup failed. Please try again.");
   }
  }
  return (
    <div className="  flex justify-center items-center min-h-screen bg-gray-100  " >
        <form
         onSubmit={handleSubmit}  
         className='bg-white shadow-md rounded-2xl p-8 w-full max-w-md  '
        >
            <h2 className='text-2xl font-semibold text-center text-black-50'
                >
              Create Aounct 
            </h2>
             <div className='mb-4'>
             <label className='block text-gray-700 mb-2'>Email</label>
             <input
              type="email"
              name="email"
              placeholder='example@02gmail.com'
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
             required
            />
            </div>
             <div className="mb-4">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="text"
            name="password"
            placeholder="********"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
          
            <div className='mb-2'>
        <label className="block text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
            </div>
            <button
             type='submit'
             className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition duration-200"
            >
          Sign Up
            </button>
            <div className='mb-2'>
                <h2 id='text' className='text-2xl font-semibold text-center text-black-50'>{ statusmsg}</h2>
            </div>
        </form>
    </div>
  )
}

export default SignUp

/*
1.✅ required — What it Does

The required HTML attribute tells the browser:

“This input must not be empty before submitting the form.”

If the user tries to submit the form without filling in this field, the browser will:

Stop the form submission

Show a built-in validation message like “Please fill out this field.”


2. value={formData.name}

In React, form inputs are usually controlled components.

That means their value is controlled by React state (formData here).

So this connects the input box to your state variable formData.name.

When the user types, it updates the state.

When the state changes, it updates the input — keeping them in sync.


3.Why [e.target.name] (with brackets)?

The brackets [ ] mean "use the value inside as a dynamic key" in an object.

Let’s say you typed in the name input. Then:
*/