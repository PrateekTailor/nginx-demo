const mongoose = require("mongoose"); // 1 db
function connectdb(url){ //  2 db
    return mongoose.connect(url);
}
module.exports = { //  3 db
    connectdb,
}