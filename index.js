const express = require("express");//1 e
const app = express(); //2 e
const urlroute = require("./routes/url"); // 4 e
const staticurl = require("./routes/staticurl");
const userroute = require("./routes/user");
const path = require("path");
const {connectdb} = require("./connection") // 5 db
const PORT = 8001; // e
const URL = require("./models/url"); // 4e
const { timeStamp } = require("node:console");
const { after } = require("node:test");
const cookieParser = require("cookie-parser");
const {checkauthorization,ristrictTO } = require("./middleware/auth");

//connection db
connectdb(process.env.MONGODB ?? 'mongodb://127.0.0.1:27017/short-id').then(()=>console.log("db connected")); // 5 db

// middleware
app.use(express.json()); // 6 e
app.use(express.urlencoded({extended:false})) // 6e
app.use(cookieParser());
app.use(checkauthorization);

// serverside rendering
app.set("view engine","ejs"); // 7e
app.set("views",path.resolve("./views")); // 7e


app.use("/url",ristrictTO(["NORMAL","ADMIN"]),urlroute); 
app.use("/user",userroute);
app.use("/",staticurl); // 8e
// 4e

app.get("/:shortId",async(req,res)=>{ // 4e
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId,
    },{$push:{
        visithistory:{
            timeStamp : Date.now()
        },
    },},{returnDocument:after});
    if(!entry)return res.status(404).json({msg:"not found entry"})
    res.redirect(entry.redirecturl);
})

app.listen(PORT,()=>console.log("server started")) //3 e