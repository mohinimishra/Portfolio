const Blog = require('../models/blogSchema');
const axios = require('axios')

module.exports.blogList = function (req) {
    let header = {}
    if (req.session.token) {
        header.Authorization = `Bearer ${req.session.token}`
    } else {
        header["x-access-apikey"] = "d88cf26c-4dff-4482-bd07-0308d3004e3c"
    }
    return new Promise((resolve, reject) => {
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
    let header = {}
    if (req.session.token) {
        header.Authorization = `Bearer ${req.session.token}`
    } else {
        header["x-access-apikey"] = "d88cf26c-4dff-4482-bd07-0308d3004e3c"
    }
    return new Promise((resolve, reject) => {
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
    let header = {}
    if (req.session.token) {
        header.Authorization = `Bearer ${req.session.token}`
    } else {
        header["x-access-apikey"] = "d88cf26c-4dff-4482-bd07-0308d3004e3c"
    }
    return new Promise((resolve, reject) => {
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
            header["x-access-apikey"] = "d88cf26c-4dff-4482-bd07-0308d3004e3c"
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
    let header = {}
    if (req.session.token) {
        header.Authorization = `Bearer ${req.session.token}`
    } else {
        header["x-access-apikey"] = "d88cf26c-4dff-4482-bd07-0308d3004e3c"
    }
    return new Promise((resolve, reject) => {
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