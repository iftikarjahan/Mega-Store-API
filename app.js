require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const notFoundMiddleare=require("./middleware/not-found");
const errorHandlingMiddleare=require("./middleware/error-handler");
const morgan=require("morgan");


const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(morgan("dev"));

app.get("/",(req,res,next)=>{
    res.send("Mega E-commerce API")
})

app.use(notFoundMiddleare);
app.use(errorHandlingMiddleare);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Connected to DB👻");
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}...`);
    });
  } catch (error) {
    console.log("Error🚩🚩: ", error);
  }
};

start();
