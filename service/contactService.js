const Contact = require('../models/contactSchema');

module.exports.addContactInfo = function (data) {
    return new Promise((resolve, reject) => {
        let newContact = new Contact(data);
        newContact.save().then((data) => {
            resolve(data)
        }).catch((err) => {
            reject(err)
        })
    })
}