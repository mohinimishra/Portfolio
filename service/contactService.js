const Contact = require('../models/contactSchema');
const { data } = require('../data');

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

module.exports.contactList = function () {
    return new Promise((resolve, reject) => {
        Contact.find().then((data) => {
            resolve(data)
        }).catch((err) => {
            reject(err)
        })
    })
}

module.exports.delete = function (id) {
    return new Promise((resolve, reject) => {
        Contact.findByIdAndDelete(id).then((data) => {
            resolve(data)
        }).catch((err) => {
            reject(err)
        })
    })
}