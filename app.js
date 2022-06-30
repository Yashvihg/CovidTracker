const express = require("express");

const bodyParser = require("body-parser");
const ejs = require("ejs");
const User=require("./user");
const Blog=require("./blogs")
const fetch = require("node-fetch");
const utils = require("./public/js/universal");
const app = express();
require("./mongoose");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  utils.getData().then((cr) => {
    res.render("home", {
      deaths: cr.deaths,
      confirmed: cr.confirmed,
      recover: cr.recover,
      active: cr.active,
    });
  });
});

app.get("/connect",async (req,res)=>{
  res.render("form");
})

app.post("/connect",async (req,res)=>{
  const newUser={
    name:req.body.name,
    email:req.body.email,
    message:req.body.message,
  }
  const user=new User(newUser); 
  await user.save();
  // res.send("Your query has been submitted successfully!");
  res.render("submit");
})

app.get("/blogs",async (req,res)=>{
  const allBlogs=await Blog.find({});
  console.log(allBlogs);
  res.render("blog",{data:allBlogs})
})

let obj = {};

app.get("/table", (req, res) => {
  res.render("table", { distName: [], distCasesArr: [] });
});

app.post("/table", (req, res) => {
  const selectedState = req.body.state;
  console.log(selectedState);
  utils.getTable().then((dt) => {
    let state = dt[`${selectedState}`];
    let distName = Object.keys(state.districtData);
    let distCasesArr = Object.values(state.districtData);
    res.render("table", { distName: distName, distCasesArr: distCasesArr });
  });
});

app.listen(3000, () => {
  console.log("Server  On 3000");
});
