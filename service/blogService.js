const Blog = require('../models/blogSchema');
const axios = require('axios')

module.exports.blogList = function (req) {
    return new Promise((resolve, reject) => {
        let header = {}
        if (req.session && req.session.token) {
            header.Authorization = `Bearer ${req.session.token}`
        } else {
            header["x-access-apikey"] = "63d8e2a6-5089-4b96-a18e-89ea06c80225"
        }
        axios.get(`http://localhost:4000/api/blogs`, {
            headers: header
        }).then((resp) => {
            resolve(resp.data.data)
        }).catch((err) => { reject(err) })
    })
    // module.exports.blogList = function () {
    //     return new Promise((resolve, reject) => {
    //         Blog.find().then((data) => {
    //             resolve(data)
    //         }).catch((err) => {
    //             reject(err)
    //         })
    //     })
    // }
}

module.exports.blogDetail = function (slug, req) {

    return new Promise((resolve, reject) => {
        let header = {}
        if (req.session && req.session.token) {
            header.Authorization = `Bearer ${req.session.token}`
        } else {
            header["x-access-apikey"] = "63d8e2a6-5089-4b96-a18e-89ea06c80225"
        }
        axios.get(`http://localhost:4000/api/blogs/slug/${slug}`, {
            headers: header
        }).then((resp) => {
            resolve(resp.data.data)
        }).catch((err) => {
            next(err)
        })
    })

    // module.exports.blogDetail = function (slug) {
    //     return new Promise((resolve, reject) => {
    //         Blog.findOne({ slug: slug }).then((data) => {
    //             resolve(data)
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
        axios.post(`http://localhost:4000/api/blogs`, data, {
            headers: header
        }).then((resp) => {
            resolve(resp.data.data)
        }).catch((err) => {
            reject(err)
        })
    })

    // module.exports.create = function (data) {
    //     return new Promise((resolve, reject) => {

    //         let newBlog = new Blog(data);
    //         newBlog.save().then((data) => {
    //             resolve(data)
    //         }).catch((err) => {
    //             reject(err)
    //         })
    //     })
    // }
}

module.exports.deleteBlog = function (_id, req) {
    return new Promise((resolve, reject) => {
        let header = {}
        if (req.session.token) {
            header.Authorization = `Bearer ${req.session.token}`
        } else {
            header["x-access-apikey"] = "63d8e2a6-5089-4b96-a18e-89ea06c80225"
        }
        axios.delete(`http://localhost:4000/api/blogs/${_id}`, {
            headers: header
        }).then((resp) => {
            resolve(resp.data.data)
        }).catch((err) => { reject(err) })
    })
    // return new Promise((resolve, reject) => {
    //     Blog.findOneAndDelete({ slug: slug }).then((data) => {
    //         resolve(data)
    //     }).catch((err) => {
    //         reject(err)
    //     })
    // })
}

module.exports.updateBlog = function (_id, data, req) {

    return new Promise((resolve, reject) => {
        let header = {}
        if (req.session.token) {
            header.Authorization = `Bearer ${req.session.token}`
        } else {
            header["x-access-apikey"] = "63d8e2a6-5089-4b96-a18e-89ea06c80225"
        }
        axios.put(`http://localhost:4000/api/blogs/${_id}`, data, {
            headers: header
        }).then((resp) => {
            resolve(resp.data.data)
        }).catch((err) => { reject(err) })

    })
    // Blog.findOneAndUpdate({ slug: slug }, { $set: data }).then((d) => {
    //     resolve(d)
    // }).catch((err) => {
    //     reject(err)
    // })
}