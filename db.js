const mongoose = require("mongoose");
const Schema = mongoose.Schema ; // schema import from mongoos  
const ObjectId = mongoose.ObjectId;
const User = new Schema ({// users data look like 
    email:String,
    password :String,
    name :String
})

const Todo = new Schema({// todos data look like 
    userId: ObjectId,
    task: String,
    // StartTime:String ,
    // EndTime:String,
    // done: Boolean
});

const UserModel  =mongoose.model('users',User);//It connects your schema (blueprint) to a MongoDB collection(todos collection ).
const TodoModel = mongoose.model('todos',Todo);//It connects your schema (blueprint) to a MongoDB collection(users collection).

module.exports = {
    UserModel:UserModel,
    TodoModel:TodoModel
}  