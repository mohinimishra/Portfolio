const Project = require('../models/projectSchema');

module.exports.projectList = function () {
    return new Promise((resolve, reject) => {
        Project.find().then((dt) => {
            resolve(dt)
        }).catch((err) => {
            reject(err)
        })
    })
}

module.exports.projectDetails = function (slug) {
    return new Promise((resolve, reject) => {
        Project.findOne({ slug: slug }).then(data => {
            resolve(data)
        }).catch((err) => {
            reject(err)
        })
    })
}

module.exports.create = function (data) {
    return new Promise((resolve, reject) => {

        let newProject = new Project(data);

        newProject.save().then((data) => {
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