const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { type: String, required: true, trim: true },
    emailId: { type: String, unique: true },
    password: { type: String, required: true, minlength: 6 },
    mobile: { type: Number, require: true },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' }
})

module.exports = mongoose.model('userReg', UserSchema)