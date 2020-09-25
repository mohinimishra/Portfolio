const Project = require('../models/projectSchema');
const axios = require('axios');


module.exports.projectList = function () {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:4000/api/projects').then((resp) => {
            resolve(resp.data.data)
        }).catch(err => reject(err))
    })

    // module.exports.projectList = function () {
    //     return new Promise((resolve, reject) => {
    //         Project.find().then((dt) => {
    //             resolve(dt)
    //         }).catch((err) => {
    //             reject(err)
    //         })
    //     })
    // }
}

module.exports.projectDetails = function (slug) {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:4000/api/projects/${slug}`).then((resp) => {
            resolve(resp.data.data)
        }).catch((err) => { reject(err) })
    })
    // module.exports.projectDetails = function (slug) {
    //     return new Promise((resolve, reject) => {
    //         Project.findOne({ slug: slug }).then(data => {
    //             resolve(data)
    //         }).catch((err) => {
    //             reject(err)
    //         })
    //     })
    // }
}

module.exports.create = function (data) {
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:4000/api/projects', data).then((resp) => {
            resolve(resp.data.data)
        }).catch((err) => { reject(err) })
    })
}

module.exports.updateProject = function (_id, data) {
    return new Promise((resolve, reject) => {
        axios.post(`http://localhost:4000/api/projects/${_id}/update`, data).then((resp) => {
            resolve(resp.data.data)
        }).catch((err) => {
            reject(err)
        })
    })
}
module.exports.uploadImage = function (_id, data) {
    return new Promise((resolve, reject) => {
        axios.post(`http://localhost:4000/api/projects/${_id}/upload-image`, data).then((resp) => {
            resolve(resp.data.data)
        }).catch((err) => {
            reject(err)
        })
    })
}

module.exports.deleteProject = function (_id) {
    return new Promise((resolve, reject) => {
        axios.delete(`http://localhost:4000/api/projects/${_id}/delete`).then((resp) => {
            resolve(resp.data.data)
        }).catch(err => reject(err))
    })
}