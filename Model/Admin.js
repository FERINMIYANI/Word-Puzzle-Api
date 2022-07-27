let mongoose = require('mongoose')
const Schema = mongoose.Schema;


const adminSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: "String",
        required: [true, 'Email ius required'],
        unique: [true, 'Same Email already exists']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    }
});


const Admin = mongoose.model('admin', adminSchema);
module.exports = Admin