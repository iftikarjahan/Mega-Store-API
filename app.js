require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const notFoundMiddleare=require("./middleware/not-found");
const errorHandlingMiddleare=require("./middleware/error-handler");
const morgan=require("morgan");
const cookeParser=require("cookie-parser");

// auth routes
const authRouter=require("./routes/authRoutes");


const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(morgan("dev"));
app.use(cookeParser());  //with every incoming req from the client, we get a cookie

app.get("/",(req,res,next)=>{
    res.send("Mega E-commerce API")
})

app.use("/api/v1/auth",authRouter);

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
