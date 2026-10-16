const User = require("../models/user");
// const {v4:uuidv4} = require("uuid");
const { setuser } = require("../service/auth");
async function handleusersignup(req,res) {
    const {name,email,password} = req.body;
    await User.create({
        name,
        email,
        password,
    })
    return res.render("home");
}
async function handleuserlogin(req,res) {
    const {email,password} = req.body;
    const user = await User.findOne({email,password});
    if(!user)return res.render("login",{
        error:"invalid"
    })
    // const sessionid = uuidv4();
    // setuser(sessionid,user);
    const token = setuser(user);
    res.cookie("uid",token);
    return res.redirect("/");
    // return res.json({token});
}

module.exports = {
    handleusersignup,
    handleuserlogin,
}