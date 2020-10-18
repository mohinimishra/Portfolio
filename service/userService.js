const User = require('../models/userSchema')
const axios = require('axios');

module.exports.addUser = function (data) {
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:4000/auth/signup', data).then((resp) => {
            resolve(resp.data.data)
        }).catch(err => reject(err))
        // let newUser = new User(data);
        // newUser.save().then((data) => {
        //     resolve(data)
        // }).catch((err) => {
        //     reject(err)
        // })
    })
}

module.exports.signin = (data) => {
    console.log(data)
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:4000/auth/signin', data).then(resp => {
            console.log("signin resp", resp)
            if (resp.status == 200) {
                resolve(resp.data)
            } else {
                reject(resp.data)
            }
        }).catch(err => reject(err))
    })
}

