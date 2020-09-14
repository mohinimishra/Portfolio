const router = require('express').Router();
const data = require('../data').data;
const Project = require('../models/projectSchema')
const ProjectService = require('../service/projectService')
const BlogService = require('../service/blogService')
const ContactService = require('../service/contactService')

router.get('/', (req, res, next) => {
    ProjectService.projectList().then((data) => {
        res.render('admin/dashboard', {
            title: 'dashboard',
            layout: 'admin/layout',
            project: data
        })
    }).catch((err) => {
        next(err)
    })

})
router.get('/project', (req, res, next) => {
    ProjectService.projectList().then((data) => {
        res.render('admin/project', {
            layout: 'admin/layout',
            title: 'Project',
            project: data
        })
    }).catch((err) => {
        next(err)
    })

})

router.get('/project/:slug', (req, res, next) => {
    let slug = req.params.slug;

    ProjectService.projectDetails(slug).then((data) => {
        let tags = data.tags
        res.render('admin/projectDetail', {
            layout: 'admin/layout',
            title: slug,
            project: data,
            tags: tags
        })
    }).catch((err) => {
        next(err)
    })
})

router.get('/project/:slug/delete', function (req, res, next) {
    ProjectService.deleteProject(req.params.slug).then(d => {
        res.redirect('/admin/project')
    }).catch(err => next(err))
})

router.get('/blog/:slug/delete', (req, res, next) => {
    BlogService.deleteBlog(req.params.slug).then((data) => {
        res.redirect('/admin/blog')
    }).catch((err) => {
        next(err)
    })
})

router.get('/blog', (req, res, next) => {
    BlogService.blogList().then((data) => {
        res.render('admin/blog', {
            layout: '/admin/layout',
            title: 'blog',
            data: data
        })
    }).catch((err) => {
        next(err)
    })
})

router.get('/blog/:slug', (req, res, next) => {
    let slug = req.params.slug;
    let tags = data.tags
    BlogService.blogDetail(slug).then((data) => {
        res.render('admin/blogDetail', {
            layout: 'admin/layout',
            data: data,
            title: slug,
            tags: tags
        })
    }).catch((err) => {
        next(err)
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
router.post('/add-project', (req, res, next) => {
    let data = req.body;

    data.slug = data.name.split(' ').join('-').toLowerCase();
    // tag section
    let t = data.tags.split(',');
    let classes = ['success', 'danger', 'info', 'warning'];
    data.tags = t.map((ele, i) => {
        return { name: ele, class: classes[i] }
    });
    // related projects
    ProjectService.create(data).then((data) => {
        res.redirect('/admin/project')
    }).catch((err) => {
        next(err)
    })
})
router.get('/addBlog', (req, res) => {
    res.render('admin/addBlog', {
        layout: 'admin/layout',
        title: 'New Blog'
    })
})
router.post('/add-blog', (req, res, next) => {

    let data = req.body;
    data.slug = data.name.split(' ').join('-').toLowerCase();
    let classes = ['primar', 'success', 'danger', 'info', 'warning'];
    let random = parseInt(Math.random() * classes.length)
    let randomClass = classes[random]
    data.tags = { name: data.tags, class: randomClass }
    BlogService.create(data).then((data) => {
        res.redirect('/admin/blog')
    }).catch((err) => {
        next(err)
    })
})

router.get('/user-contact', (req, res, next) => {
    ContactService.contactDetail().then((data) => {
        res.render('admin/user-contact', {
            layout: 'admin/layout',
            title: "User's Information",
            data: data
        })
    })

})




module.exports = router;