const mongoose = require('mongoose');

//  const mongoUrl = `mongodb://127.0.0.1:27017/authtest`
mongo_url = process.env.MONGO_URI
 

 mongoose.connect(mongo_url)

let userSchema = mongoose.Schema({
    username : String,
    email : String,
    password :String,
    age : Number
})

module.exports = mongoose.model('users',userSchema);