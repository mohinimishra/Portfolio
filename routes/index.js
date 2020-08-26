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
    res.render('about', {
        layout: 'layout',
        title: 'about',
        blogInd
    })
}
module.exports.contact = (req, res) => {
    res.render('contact', {
        layout: 'layout',
        title: 'contact'
    })
}

module.exports.signin = (req, res) => {
    res.render('signin', {
        layout: 'layout',
        title: 'signin',
        message: ""
    })
}

let db = [{
    email: "mohini@gmail.com",
    password: '12345'
},
{
    email: "mm@gmail.com",
    password: '123'
}]

module.exports.login = (req, res) => {
    let body = req.body
    console.log(req.body)
    let user = db.filter((ele) => ((ele.email === body.email && ele.password === body.password)))
    if (user.length) {
        req.session.user = user[0]
        console.log(req.session.user)
        req.session.isLoggedIn = true
        res.redirect('dashboard')
    } else {
        res.render('signin', {
            layout: 'layout',
            title: 'login',
            message: 'Email or Password Incorrect'
        })
    }
}

module.exports.dashboard = (req, res) => {
    res.render('admin/dashboard', {
        title: 'dashboard',
        layout: 'layout'
    })
}


