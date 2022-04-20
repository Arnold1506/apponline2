const mongoose = require('mongoose');
const { Schema } = mongoose;


const userSchema = new Schema({
    id: String,
    patientId: String,
    stime: String,
    etime: String

});

const Slot = mongoose.model('slot', userSchema);

module.exports = Slot;