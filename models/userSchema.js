const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
    name: { type: String, required: true, trim: true },
    emailId: { type: String, unique: true, required: true },
    password: { type: String, required: true, minlength: 6 },
    mobile: { type: Number, require: true },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' }
})

UserSchema.pre('save', function (next) {
    if (!this.isModified()) {
        this.password = this.encryptPass(this.password)
        next()
    } else {
        this.password = this.encryptPass(this.password);
        next()
    }
})

UserSchema.methods = {
    encryptPass: function (plainPassword) {
        if (!plainPassword) {
            return "Password Incorrect"
        } else {
            return bcrypt.hashSync(plainPassword, 10)
        }
    },

    comparePass: function (plainPassword) {
        return bcrypt.compareSync(plainPassword, this.password)
    }
}

module.exports = mongoose.model('users', UserSchema)