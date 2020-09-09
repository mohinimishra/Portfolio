const Blog = require('../models/blogSchema')

module.exports.blogList = function () {
    return new Promise((resolve, reject) => {
        Blog.find().then((data) => {
            resolve(data)
        }).catch((err) => {
            reject(err)
        })
    })
}

module.exports.create = function (data) {
    return new Promise((resolve, reject) => {

        let newBlog = new Blog(data);
        newBlog.save().then((data) => {
            resolve(data)
        }).catch((err) => {
            reject(err)
        })
    })
}