const mongoose = require('mongoose');
const { Schema } = mongoose;


const userSchema = new Schema({
    fname: String,
    lname: String,
    email: String,
    userType: String,
    password: String
});

const User = mongoose.model('user', userSchema);

module.exports = User;