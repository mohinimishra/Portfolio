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
    })
}

module.exports.projectDetails = (req, res) => {
    let slug = req.params.slug
    res.render('projectDetails', {
        layout: 'layout',
        title: slug,
        nav: 'blogs'
    })
}

module.exports.blog = (req, res) => {
    res.render('blog', {
        layout: 'layout',
        title: 'blog'
    })
}

module.exports.blogDetails = (req, res) => {
    let slug = req.params.slug
    res.render('blogDetails', {
        layout: 'layout',
        title: slug
    })
}

module.exports.about = (req, res) => {
    res.render('about', {
        layout: 'layout',
        title: 'about'
    })
}