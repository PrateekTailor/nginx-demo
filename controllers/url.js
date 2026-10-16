const ShortId = require("shortid"); // 2 {pkg}
const URL = require("../models/url"); // 1 db

async function handlegenearateshortid(req,res){ // 3 e
    const body = req.body; // 4e
    if(!body.url) return res.status(400).json({msg:"not found"})
    const shortid = ShortId.generate(); // 2 e
    await URL.create({  // 1 db
        shortId:shortid, 
        redirecturl:body.url,
        visithistory:[],
        createdby:req.user._id,
    })
    return res.render("home",{ //5e
        id:shortid,
    })
    // return res.json({id:shortid})
}
module.exports = { // 6e
    handlegenearateshortid,
}