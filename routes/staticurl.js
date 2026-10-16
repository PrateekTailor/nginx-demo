const express = require("express"); // 1 e
const URL = require("../models/url"); // 4 db
const { ristrictTO } = require("../middleware/auth");
const router = express.Router(); // 2e

router.get("/admin/urls",ristrictTO(["ADMIN",]),async(req,res)=>{ // 3e
    // if(!req.user)return res.redirect("login");
    const allurls = await URL.find({})
    return res.render("home",{
        urls:allurls,
    })
})

router.get("/",ristrictTO(["NORMAL","ADMIN"]),async(req,res)=>{ // 3e
    // if(!req.user)return res.redirect("login");
    const allurls = await URL.find({createdby:req.user._id})
    return res.render("home",{
        urls:allurls,
    })
})

router.get("/signup",(req,res)=>{
    return res.render("signup");
})

router.get("/login",(req,res)=>{
    return res.render("login");
})

module.exports = router; // 5 e