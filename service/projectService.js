const Project = require('../models/projectSchema');
const axios = require('axios');
// module.exports.projectList = function () {
//     return new Promise((resolve, reject) => {
//         Project.find().then((dt) => {
//             resolve(dt)
//         }).catch((err) => {
//             reject(err)
//         })
//     })
// }

module.exports.projectList = function () {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:4000/api/projects').then((resp) => {
            console.log(resp)
            resolve(resp.data.data)
        }).catch(err => reject(err))
    })
}

module.exports.projectDetails = function (slug) {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:4000/api/projects/${slug}`).then((resp) => {
            resolve(resp.data.data)
        }).catch((err) => { reject(err) })
    })
}



// module.exports.projectDetails = function (slug) {
//     return new Promise((resolve, reject) => {
//         Project.findOne({ slug: slug }).then(data => {
//             resolve(data)
//         }).catch((err) => {
//             reject(err)
//         })
//     })
// }

module.exports.create = function (data) {
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:4000/api/projects', data).then((respesons))
    })
}

module.exports.updateProject = function (slug, data) {
    return new Promise((resolve, reject) => {
        Project.findOneAndUpdate({ slug: slug }, { $set: data }).then((data) => {
            resolve(data)
        }).catch((err) => {
            reject(err)
        })
    })
}


module.exports.deleteProject = function (slug) {
    return new Promise((resolve, reject) => {
        Project.findOneAndDelete({ slug: slug }).then(d => {
            resolve(d)
        }).catch(err => reject(err))
    })
}