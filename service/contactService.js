const Contact = require('../models/contactSchema');
const { data } = require('../data');
const axios = require('axios')
// module.exports.addContactInfo = function (data, req) {
//     let header = {}
//     if (req.session.token) {
//         header.Authorization = `Bearer ${req.session.token}`
//     } else {
//         header["x-access-apikey"] = "d88cf26c-4dff-4482-bd07-0308d3004e3c"
//     }
//     return new Promise((resolve, reject) => {
//         axios.post(`http://localhost:4000/auth/contacts`, data, {
//             headers: header
//         }).then((resp) => {
//             console.log("contact data", resp.data.data)
//             resolve(resp.data.data)
//         }).catch(err => reject(err))
//     })

// }

module.exports.contactList = function (req) {
    // let header = {}
    // console.log("contact", req.session.token);
    // if (req.session.token) {
    //     header.Authorization = `Bearer ${req.session.token}`
    // } else {
    //     header["x-access-apikey"] = "d88cf26c-4dff-4482-bd07-0308d3004e3c"
    // }
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:4000/api/contacts', {
            headers: {
                "Authorization": `Bearer ${req.session.token}`
            }
        }).then(resp => resolve(resp.data.data))
            .catch(err => reject(err))
    })
}

module.exports.delete = function (id, req) {
    // let header = {}
    // if (req.session.token) {
    //     header.Authorization = `Bearer ${req.session.token}`
    // } else {
    //     header["x-access-apikey"] = "d88cf26c-4dff-4482-bd07-0308d3004e3c"
    // }
    return new Promise((resolve, reject) => {
        axios.delete(`http://localhost:4000/api/contacts/${id}`, data, {
            headers: {
                "Authorization": `Bearer ${req.session.token}`
            }
        }).then(resp =>
            resolve(resp.data.data))
            .catch(err => reject(err))

    })
}