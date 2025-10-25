import axios from "axios";
import React, { useState} from "react";
import { useContext } from "react";
import { AuthContext } from "./context";

  function  Create (){
  const { token } = useContext(AuthContext);//get token from context  
    const [task,setTask ] = useState('');
  const [message,setMessage] = useState('');

   async  function handleAdd(){
  if (!token) {
      setMessage("❌ Please sign in before adding a task!");
    //  setMessage("")
      return;
    }
      const response =  await axios.post ('http://localhost:3000/todo',{
      task:task 
    },
    {
       headers: {
            Authorization: `Bearer ${token}`, // send token to backend
          }
        }
     /*
     “Bearer” is not the token itself — it’s just a label (a keyword) that tells the server:

“Hey, I’m giving you a token that proves my identity — use it to authorize me.” 
   Bearer is a convention   , every developer use it with token 
     */ 
  )
   setMessage(response.data.mesaage || "Task added successfully");
      
   setTask("")// input side empty afer giving input 
   
   }
return (
    <div className="">
         <lable className='block text-gray-700 mb-2'>Write Task</lable>
       <input
    type="text"
    placeholder="Enter Task"
    onChange={(e) => setTask(e.target.value)}
    className="w-96 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
  />
  <button
    type="button"
    className=" ml-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
    onClick={handleAdd}   
  >
    Add
  </button>
    {/* message display area */}
      {message && (
        <p className="mt-4 text-lg font-medium text-gray-700">{message}</p>
      )}
  </div>
)
  }

export default Create;