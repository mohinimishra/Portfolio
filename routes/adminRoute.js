const router = require('express').Router();
const data = require('../data').data


router.get('/', (req, res) => {
    res.render('admin/dashboard', {
        title: 'dashboard',
        layout: 'admin/layout',
        project: data.myProjects
    })
})


router.get('/project', (req, res) => {
    res.render('admin/project', {
        layout: 'admin/layout',
        title: 'Project',
        project: data.myProjects
    })
})

router.get('/project/:slug', (req, res) => {
    console.log(req.session)
    let slug = req.params.slug
    let index = data.projectIndex[slug]
    let project = data.myProjects[index]
    let tags = project.tags
    res.render('admin/formLayout', {
        layout: 'admin/layout',
        title: slug,
        project: project,
        tags: tags
    })
})

router.get('/signout', (req, res) => {
    req.session.isLoggedIn = false;
    console.log(req.session)
    res.redirect('/signin')
})

router.get('/addProject', (req, res) => {
    res.render('admin/addProject', {
        layout: 'admin/layout',
        title: 'New Project'
    })
})


module.exports = router;