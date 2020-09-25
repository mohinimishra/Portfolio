const Blog = require('../models/blogSchema');
const axios = require('axios')

// module.exports.blogList = function () {
//     return new Promise((resolve, reject) => {
//         Blog.find().then((data) => {
//             resolve(data)
//         }).catch((err) => {
//             reject(err)
//         })
//     })
// }

module.exports.blogList = function () {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:4000/api/blogs`).then((resp) => {
            resolve(resp.data.data)
        }).catch((err) => { reject(err) })
    })
}

// module.exports.blogDetail = function (slug) {
//     return new Promise((resolve, reject) => {
//         Blog.findOne({ slug: slug }).then((data) => {
//             resolve(data)
//         }).catch((err) => {
//             next(err)
//         })
//     })
// }

module.exports.blogDetail = function (slug) {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:4000/api/blogs/${slug}`).then((resp) => {
            resolve(resp.data.data)
        }).catch((err) => { reject(err) })
    })
}


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

module.exports.create = function (data) {
    return new Promise((resolve, reject) => {
        axios.post(`http://localhost:4000/api/blogs`, data).then((resp) => {
            resolve(resp.data.data)
        }).catch((err) => {
            reject(err)
        })
    })
}

module.exports.deleteBlog = function (slug) {
    return new Promise((resolve, reject) => {
        Blog.findOneAndDelete({ slug: slug }).then((data) => {
            resolve(data)
        }).catch((err) => {
            reject(err)
        })
    })
}

module.exports.updateBlog = function (slug, data) {
    return new Promise((resolve, reject) => {
        Blog.findOneAndUpdate({ slug: slug }, { $set: data }).then((d) => {
            resolve(d)
        }).catch((err) => {
            reject(err)
        })
    })
}