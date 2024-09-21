import express from "express";
import dotenv from "dotenv";
// import morgan from "morgan";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//MIDDLEWARE
// app.use(morgan("dev"));

app.get("/heavy", (req, res) => {

  let total= 0;
  for (let i = 0; i < 50_000_000; i++) {
    total++
  }
  res.status(200).send(`SERVER RUNNING AND VALUE OF TOTAL IS : ${total}`);
});

//TO CHECK HEAVY LOAD => [  npx loadtest -n 1200 -c 400 -k http://localhost:8000/heavy  ]

app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON ${PORT}`);
  console.log(`SERVER PID : ${process.pid}`);
});
