// const sessionidstoreroom = new Map();
const jwt = require("jsonwebtoken");
const secret = "lncol";
// function setuser(id,user) {
//     sessionidstoreroom.set(id,user);
// }
function setuser(user){
    return jwt.sign({
        _id:user._id,
        email:user.email,
        role:user.role,
    },secret);
}
function getuser(token){
    if(!token)return null;
    try {
        return jwt.verify(token,secret);
    } catch (error) {
        return null;
    }
}
// function getuser(id){
//     return sessionidstoreroom.get(id);
// }

module.exports={
    setuser,
    getuser,
}