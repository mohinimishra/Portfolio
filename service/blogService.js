const Blog = require('../models/blogSchema');
const axios = require('axios')

module.exports.blogList = function () {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:4000/api/blogs`).then((resp) => {
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

module.exports.blogDetail = function (slug) {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:4000/api/blogs/slug/${slug}`).then((resp) => {
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

module.exports.create = function (data) {
    return new Promise((resolve, reject) => {
        axios.post(`http://localhost:4000/api/blogs`, data).then((resp) => {
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

module.exports.deleteBlog = function (_id) {
    return new Promise((resolve, reject) => {
        axios.delete(`http://localhost:4000/api/blogs/${_id}`).then((resp) => {
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

module.exports.updateBlog = function (_id, data) {
    return new Promise((resolve, reject) => {
        axios.put(`http://localhost:4000/api/blogs/${_id}`, data).then((resp) => {
            resolve(resp.data.data)
        }).catch((err) => { reject(err) })

    })
    // Blog.findOneAndUpdate({ slug: slug }, { $set: data }).then((d) => {
    //     resolve(d)
    // }).catch((err) => {
    //     reject(err)
    // })
}