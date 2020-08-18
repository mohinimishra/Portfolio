const data = require('../data').data

module.exports.homepage = (req, res) => {
    res.render('portfolio', {
        layout: "",
        title: "Mohini",
        nav: 'home'
    })
}

module.exports.projects = (req, res) => {
    res.render('projects', {
        layout: 'layout',
        title: 'Projects',
        projects: data.myProjects
    })
}

module.exports.projectDetails = (req, res) => {
    let slug = req.params.slug
    let index = data.projectIndex[slug]
    let project = data.myProjects[index]
    res.render('projectDetails', {
        layout: 'layout',
        title: slug,
        nav: 'blogs',
        data: project
    })
}
let blogData = data.myBlog;


module.exports.blog = (req, res) => {
    let randumNum = parseInt(Math.random() * blogData.length)
    res.render('blog', {
        layout: 'layout',
        title: 'blog',
        featuredBlog: blogData[randumNum],
        blogData,
        categories: data.blogCategories
    })
}

module.exports.blogDetails = (req, res) => {
    let slug = req.params.slug
    let index = data.blogIndex[slug]
    let blog = data.myBlog[index]
    res.render('blogDetails', {
        layout: 'layout',
        title: slug,
        categories: data.blogCategories,
        data: blog
    })
}

module.exports.about = (req, res) => {
    let blog = data.blogIndex
    let blogInd = Object.keys(blog)
    console.log(blogInd)
    res.render('about', {
        layout: 'layout',
        title: 'about',
        blogInd
    })
}