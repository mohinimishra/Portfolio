const router = require('express').Router()
const ProjectService = require('../service/projectService')
const mongodb = require('mongodb').MongoClient;

let db;
mongodb.connect('mongodb://localhost:27017', function (err, client) {
    if (err) {
        console.log('Mongodb connection failed.')
    } else {
        console.log('Mongodb connected')
        db = client.db('portfolio')
    }
})

router.get('/', (req, res) => {
    let projectCollection = db.collection('projects');
    projectCollection.find().toArray((err, data) => {
        if (err) {
            console.log(err)
        } else {
            console.log(data)
            res.render('projects', {
                layout: 'layout',
                title: 'Projects',
                projects: data
            })
        }
    })

})

router.get('/:slug', (req, res, next) => {
    // let slug = req.params.slug
    // console.log(slug)
    // let index = data.projectIndex[slug]
    // let project = data.myProjects[index]
    // res.render('projectDetails', {
    //     layout: 'layout',
    //     title: slug,
    //     nav: 'blogs',
    //     data: project
    // })
    let slug = req.params.slug

    console.log(slug)

    ProjectService.projectDetails(req, slug).then((data) => {
        console.log('projdata', data)
        res.render('projectDetails', {
            layout: 'layout',
            title: slug,
            // categories: data.blogCategories,
            data: data
        })
    }).catch((err) => {
        next(err)
    })
})

module.exports = router;