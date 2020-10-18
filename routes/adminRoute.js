const router = require('express').Router();
const fs = require('fs');
const unzipper = require('unzipper');
// const data = require('../data').data;
const Project = require('../models/projectSchema')
const ProjectService = require('../service/projectService')
const BlogService = require('../service/blogService')
const ContactService = require('../service/contactService');
const multer = require('multer');
const path = require('path');
const { route } = require('./indexRoute');
const uploadDemo = require('../service/uploadDemo');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../static/image'))
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage: storage
})

// dashboard
router.get('/', (req, res, next) => {
    ProjectService.projectList(req).then((data) => {
        res.render('admin/dashboard', {
            title: 'dashboard',
            layout: 'admin/layout',
            project: data
        })
    }).catch((err) => {
        next(err)
    })

})

// project-section

router.get('/project', (req, res, next) => {
    ProjectService.projectList(req).then((data) => {
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

router.get('/addProject', (req, res, next) => {
    ProjectService.projectList(req).then((data) => {
        res.render('admin/addProject', {
            layout: 'admin/layout',
            title: 'New Project',
            data: data
        })
    }).catch((err) => {
        next(err)
    })

})

router.post('/add-project', (req, res, next) => {
    let data = req.body;
    // data.slug = data.name.split(' ').join('-').toLowerCase();
    // // tag section
    // let t = data.tags.split(',');
    // let classes = ['success', 'danger', 'info', 'warning'];
    // data.tags = t.map((ele, i) => {
    //     return { name: ele, class: classes[i] }
    // });
    // related projects
    ProjectService.create(data, req).then((data) => {
        res.redirect('/admin/project')
    }).catch((err) => {
        next(err)
    })
})

router.get('/project/:_id/delete', function (req, res, next) {
    ProjectService.deleteProject(req.params._id, req).then(d => {
        res.redirect('/admin/project')
    }).catch(err => next(err))
})

router.post('/project/:_id/update', function (req, res, next) {
    let data = req.body;
    // data.slug = data.name.split(' ').join('-').toLowerCase();
    // // tag section
    // let t = data.tags.split(',');
    // let classes = ['success', 'danger', 'info', 'warning'];
    // data.tags = t.map((ele, i) => {
    //     return { name: ele, class: classes[i] }
    // });
    // related projects
    ProjectService.updateProject(req.params._id, data, req).then((data) => {
        res.redirect('/admin/project')
    }).catch((err) => {
        next(err)
    })
})

router.get('/project/:_id/upload', function (req, res, next) {
    res.render('admin/upload', {
        layout: '/admin/layout',
        title: 'Upload',
        path: `/admin/project/${req.params._id}/upload-image`
    })
})

router.post('/project/:_id/upload-image', upload.single('img'), (req, res, next) => {
    ProjectService.updateProject(req.params._id, { image: `/image/${req.file.originalname}` }, req).then(dt => {
        res.redirect('/admin/project')
    }).catch(err => next(err))
})

router.get('/project/:slug/upload-demo', function (req, res, next) {
    res.render('admin/upload', {
        layout: '/admin/layout',
        title: 'Upload-demo',
        path: `/admin/project/${req.params.slug}/upload-demo`
    })
})

router.post('/project/:slug/upload-demo', function (req, res, next) {
    let filename = `${req.params.slug}.zip`;
    let directoryName = path.join(__dirname, `../static/projects/${req.params.slug}`);
    function uploaded(err, succ) {
        if (err) {
            next(err)
        } else {
            fs.createReadStream(directoryName + '/' + filename).pipe(unzipper.Extract({ path: directoryName }));

            fs.unlinkSync(directoryName + '/' + filename);

            res.redirect('/admin/project');
        }
    }
    uploadDemo.upload(req, res, filename, directoryName, uploaded);
})


// blog-section

router.get('/blog', (req, res, next) => {
    BlogService.blogList(req).then((data) => {
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
    BlogService.blogDetail(slug, req).then((data) => {
        let tags = data.tags
        res.render('admin/blogDetail', {
            layout: 'admin/layout',
            data: data,
            title: slug,
            tags: tags
        })
    }).catch(err => next(err))
})

router.get('/addBlog', (req, res) => {
    res.render('admin/addBlog', {
        layout: 'admin/layout',
        title: 'New Blog'
    })
})

router.post('/add-blog', (req, res, next) => {
    let data = req.body;
    // data.slug = data.name.split(' ').join('-').toLowerCase();
    // let classes = ['primar', 'success', 'danger', 'info', 'warning'];
    // let random = parseInt(Math.random() * classes.length)
    // let randomClass = classes[random]
    // data.tags = { name: data.tags, class: randomClass }
    BlogService.create(data, req).then((data) => {
        res.redirect('/admin/blog')
    }).catch((err) => {
        next(err)
    })
})

router.get('/blog/:_id/delete', (req, res, next) => {
    BlogService.deleteBlog(req.params._id, req).then((data) => {
        res.redirect('/admin/blog')
    }).catch((err) => {
        next(err)
    })
})

router.get('/blog/:_id/upload', function (req, res, next) {
    res.render('admin/upload', {
        layout: '/admin/layout',
        title: 'upload',
        path: `/admin/blog/${req.params._id}/upload-image`
    })
})

router.post('/blog/:_id/update', (req, res, next) => {
    let data = req.body;
    // data.slug = data.name.split(' ').join('-').toLowerCase();
    // let classes = ['primar', 'success', 'danger', 'info', 'warning'];
    // let random = parseInt(Math.random() * classes.length)
    // let randomClass = classes[random]
    // data.tags = { name: data.tags, class: randomClass }
    BlogService.updateBlog(req.params._id, data, req).then((data) => {
        res.redirect('/admin/blog')
    }).catch((err) => {
        next(err)
    })

})

router.post('/blog/:_id/upload-image', upload.single('img'), (req, res, next) => {
    BlogService.updateBlog(req.params._id, { image: `/image/${req.file.originalname}` }, req).then((data) => {
        res.redirect('/admin/blog')
    }).catch(err => next(err))
})

router.get('/signout', (req, res) => {
    req.session.isLoggedIn = false;
    res.redirect('/signin')
})

// contact Section
router.get('/user-contact', (req, res, next) => {
    ContactService.contactList(req).then((data) => {
        res.render('admin/user-contact', {
            layout: 'admin/layout',
            title: "User's Information",
            data: data.data
        })
    }).catch(err => next(err))
})

router.get('/user-contact/:_id/delete', (req, res, next) => {
    ContactService.delete(req.params._id, req).then((data) => {
        res.redirect('/admin/user-contact')
    }).catch((err) => {
        next(err)
    })
})

module.exports = router;