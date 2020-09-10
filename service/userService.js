const User = require('../models/userSchema')

module.exports.addUser = function (data) {
    return new Promise((resolve, reject) => {
        let newUser = new User(data);
        newUser.save().then((data) => {
            resolve(data)
        }).catch((err) => {
            reject(data)
        })
    })
}