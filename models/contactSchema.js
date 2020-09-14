const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: Number, required: true },
    description: { type: String, required: true },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' }
})

module.exports = mongoose.model('contact', contactSchema)