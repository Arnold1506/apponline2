const mongoose = require('mongoose');
const { Schema } = mongoose;


const userSchema = new Schema({
    email: String,
    date: String,
    stime: String,
    etime: String
});

const Schedule = mongoose.model('schedule', userSchema);

module.exports = Schedule;