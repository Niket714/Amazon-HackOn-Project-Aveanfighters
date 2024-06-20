import express from 'express';
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "amazon",
  password: "",
  port: 5432,
});

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/' , (req,res)=>{
  res.render("main_page.ejs");
});

app.get("/threshold_setter" , (req , res)=>{
  res.render("threshold_setter.ejs");
});

app.get("/checkout" , (req , res)=>{
  res.render("checkout.ejs");
});

app.listen(port , ()=>{
  console.log(`the server is running on port ${port}`);
});
