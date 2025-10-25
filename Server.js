const express = require("express");
const cors = require("cors");
const { UserModel, TodoModel } = require("./db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "s3cret";
 const {z} =require("zod"); 
const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
// Connect to MongoDB Atlas
mongoose.connect("Copy your MongoDb Compuss  URL ")
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch(err => console.error("❌ MongoDB connection error:", err));
  
const app =express();
 app.use(express.json());
 app.use(cors({
  origin: "http://localhost:5173",
  //credentials: true,
}));

app.post("/signup", async function(req,res){
    // Zod schema  (input look like )
     const requireBody = z.object({
           email:z.string().min(5).email().regex(/[A-Z]/),
            password:z.string().max(14),
             name:z.string()
     }) 

     const passwordMatch = requireBody.safeParse(req.body);

     if(!passwordMatch.success){ 
         res.json({
              message:"incorect Format",
             // error:passwordMatch.error // throw error which kind of error happen in your format 
         })
         return ;
     }

   const email = req.body.email;// this are taken from the user 
    const password = req.body.password;//abstruct the value from user the that is given by user
    const name = req.body.name;//abstruct the value from user the that is given by user
   console.log("📩 Received signup:", req.body);  

    { // menually  input validation 
 //    // now Input validation 
//         if(typeof email!=="string" || !email.includes("@") || email.length<5){
//               res.json({
//                   message:"Email Incorrect"
//               })
//               return ;
//         }
//           // now password validation
//             if(typeof password!=="string" ||  email.length<5){
//               res.json({
//                   message:"Password is not Valid "
//               })
//               return ;
//         }
    } 

   try{
    const hashedPassword = await bcrypt.hash(password,10);
     console.log(hashedPassword);
 
    await UserModel.create({// why use await , await untill data is inserted   in the mongo 
        email: email,
        password: hashedPassword,
        name: name
    });
} catch(err){ // user signup again then return it 
       res.json({message:"User already exist"});
}
    res.json({message: "You have logged in successfully"});

});

app.post("/signin", async function(req,res){
      const email =req.body.email ;// user identity 
      const password = req.body.password;
      const response = await  UserModel.findOne({ // it give object type value but it can be use as bool  
      email:email,// by email find the user from data base 
          
      })   
         
       if(!response){ // if user does not loged in so retrun it 
         res.status(403).json({
              message :"User does not exist in our data"
         })
          return ;
       }
         const passwordMatch =   await bcrypt.compare(password,response.password) ;// come hash value and plain  text password then give bool type value 
          
    if(passwordMatch){
        const token =jwt.sign({
            id:response._id.toString()// user id store in String because userId is not String it is OjectId 
        },JWT_SECRET);
        res.json({
             token:token// user id send to the client 
        })  
    } else{
         res.status(403).json({
            mesaage:"Incorrect Credentioals"
         })
    }
})

app.post("/todo",auth,async  function(req,res){// login user can create todo so use auth function authentication by token 
  const userId = req.userId;// abstruct the value from user the that is given by user token 
   const task =req.body.task;
   
    await TodoModel.create({// insert the todo in mongo Db 
        userId,
        task,
         
    })
 res.json({
   mesaage:"todo is created"
 })

})

app.get("/todos",auth, async function(req,res){

 const userId =req.userId;

 const todos = await TodoModel.find({ // find todo in data base 
  userId
 })
  res.json({
        todos
    })

})
app.delete("/delete",async function(req,res){

    const todoId = req.body.id ;
   await TodoModel.findByIdAndDelete(todoId);// todo delete from data base 
  res.json({ message: 'Todo deleted' });
     
})

function auth(req, res, next) {

    const authHeader = req.headers.authorization; // expect "Bearer <token>" and in req headers we set the token  so 
    
    const token = authHeader.split(" ")[1]; // remove "Bearer" and take only token part 
/*
This splits the string wherever there’s a space " ".
     [0] → "Bearer"
     [1] → "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

    */
    try {// if true token exist of past login id 
        const decoded = jwt.verify(token, JWT_SECRET); // verify 
        req.userId = decoded.id; // store user ID in request
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid token" });
    }
};

app.listen(3000, () => {

  console.log("✅ Server running on http://localhost:3000");

});
