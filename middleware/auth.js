const { getuser } = require("../service/auth");
function checkauthorization(req,res,next){
    const tokencokkies = req.cookies?.uid;
    req.user = null;
    if(!tokencokkies)return next();
    const token = tokencokkies;
    const user = getuser(token);
    req.user = user;
    next();
}
function ristrictTO(roles = []){
    return function(req,res,next){
        if(!req.user)return res.redirect("/login");
        if(!roles.includes(req.user.role)) return res.end("authrized");
        return next();
    }
}
// async function ristrictloginuser(req,res,next) {
//     // const useruid = req.cookies.uid;
//     const useruid = req.headers["authorization"];
//     if(!useruid)return res.redirect("login");
//     const token = useruid.split("Bearer ")[1];
//     const user = getuser(token);
//     if(!user)return res.redirect("login");
//     req.user = user;
//     next();
// }
// async function checkauth(req,res,next){
//     // const useruid = req.cookies.uid;
//     const useruid = req.headers["authorization"];
//     const token = useruid.split("Bearer ")[1];
//     const user = getuser(token);
//     // const user = getuser(useruid);
//     req.user = user;
//     next();
// }
module.exports = {
    // ristrictloginuser,
    // checkauth,
    checkauthorization,
    ristrictTO,
}