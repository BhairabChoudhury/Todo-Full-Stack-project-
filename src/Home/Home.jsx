import React from "react";
import { useState ,useEffect,useContext} from "react";
import Create from "./Create.jsx";
import { BsCircleFill, BsFillTrashFill } from "react-icons/bs";
import axios from "axios";
import { AuthContext } from "./context.jsx";
function Home ()   {
 const [todos,setTodos] = useState([])
  const {token} = useContext(AuthContext) ;
  useEffect(() => {
    // fetch todos on component mount
    const fetchTodos = async () => {
      try {
        const res = await axios.get("http://localhost:3000/todos",{
          headers:{
               Authorization: `Bearer ${token}`, // ✅ send token
          }
        }); // adjust endpoint
        setTodos(res.data.todos); // store in state
      } catch (err) {
        console.error("Error fetching todos:", err);
      }
    };

    fetchTodos(); // call the async function
  }, [token,todos]); // when you sign in and when you add new task then it fetch dada from backend 
  // ✅ Delete todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/delete`,{ 
        data: { id }, // 👈 Must use 'data' property
      });
      // Update frontend list
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  };
 return (

 <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-xl mb-4">
        <h2 className="text-3xl font-bold text-center text-gray-800">Todo List</h2>
      </div>

      {/* Create Task Input */}
      <div className="w-full max-w-xl">
        <Create />
      </div>

      {/* Todo List */}
      <div className="w-full max-w-xl mt-6">
        {todos.length === 0 ? (
          <div className="text-center py-10">
            <h2 className="text-gray-500 text-lg">No todos yet</h2>
          </div>
        ) : (
          <ul className="space-y-3">
            {todos.map((todo) => (
              <li
                key={todo._id}
                className="flex justify-between items-center bg-white shadow-md rounded-lg p-4 hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  <BsCircleFill className="text-blue-500" />
                  <p className="text-gray-800">{todo.task}</p>
                </div>
                <button
                  onClick={() => deleteTodo(todo._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <BsFillTrashFill className="text-lg" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>

 )
}

export default Home ;
