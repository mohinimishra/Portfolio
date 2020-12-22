const Project = require('../models/projectSchema');
const axios = require('axios');


module.exports.projectList = function (req) {
    return new Promise((resolve, reject) => {
        let header = {}
        if (req.session.token) {
            header.Authorization = `Bearer ${req.session.token}`
        } else {
            header["x-access-apikey"] = "63d8e2a6-5089-4b96-a18e-89ea06c80225"
        }
        axios.get('http://localhost:4000/api/projects', {
            headers: header
        }).then((resp) => {
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

module.exports.projectDetails = function (req, slug) {
    return new Promise((resolve, reject) => {
        let header = {}
        console.log(slug)
        if (req.session && req.session && req.session.token) {
            header.Authorization = `Bearer ${req.session.token}`
        } else {
            header["x-access-apikey"] = "63d8e2a6-5089-4b96-a18e-89ea06c80225"
        }
        axios.get(`http://localhost:4000/api/projects/slug/${slug}`, {
            headers: header
        }).then((resp) => {
            resolve(resp.data.data)
        }).catch((err) => {
            reject(err)
        })
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

module.exports.create = function (data, req) {
    return new Promise((resolve, reject) => {
        let header = {}
        if (req.session.token) {
            header.Authorization = `Bearer ${req.session.token}`
        } else {
            header["x-access-apikey"] = "63d8e2a6-5089-4b96-a18e-89ea06c80225"
        }
        axios.post('http://localhost:4000/api/projects', data, {
            headers: header
        }).then((resp) => {
            resolve(resp.data.data)
        }).catch((err) => { reject(err) })
    })
}

module.exports.updateProject = function (_id, data, req) {
    let header = {}
    if (req.session.token) {
        header.Authorization = `Bearer ${req.session.token}`
    } else {
        header["x-access-apikey"] = "63d8e2a6-5089-4b96-a18e-89ea06c80225"
    }
    return new Promise((resolve, reject) => {
        axios.put(`http://localhost:4000/api/projects/${_id}`, data, {
            headers: header
        }).then((resp) => {
            resolve(resp.data.data)
        }).catch((err) => {
            reject(err)
        })
    })
}
module.exports.uploadImage = function (_id, data, req) {
    let header = {}
    if (req.session.token) {
        header.Authorization = `Bearer ${req.session.token}`
    } else {
        header["x-access-apikey"] = "63d8e2a6-5089-4b96-a18e-89ea06c80225"
    }
    return new Promise((resolve, reject) => {
        axios.post(`http://localhost:4000/api/projects/${_id}/upload-image`, data, {
            headers: header
        }).then((resp) => {
            resolve(resp.data.data)
        }).catch((err) => {
            reject(err)
        })
    })
}

module.exports.deleteProject = function (_id, req) {
    let header = {}
    if (req.session.token) {
        header.Authorization = `Bearer ${req.session.token}`
    } else {
        header["x-access-apikey"] = "63d8e2a6-5089-4b96-a18e-89ea06c80225"
    }
    return new Promise((resolve, reject) => {
        axios.delete(`http://localhost:4000/api/projects/${_id}`, {
            headers: header
        }).then((resp) => {
            resolve(resp.data.data)
        }).catch(err => reject(err))
    })
}