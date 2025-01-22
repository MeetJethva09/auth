const mongoose = require('mongoose');

//  const mongoUrl = `mongodb://127.0.0.1:27017/authtest`

 const mongoURI = "mongodb+srv://auth:marco@1001@cluster0.7ow2g.mongodb.net/"

 mongoose.connect(mongoURI)

let userSchema = mongoose.Schema({
    username : String,
    email : String,
    password :String,
    age : Number
})

module.exports = mongoose.model('users',userSchema);