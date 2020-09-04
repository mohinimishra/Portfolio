const router = require('express').Router()
const data = require('../data').data

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

router.get('/:slug', (req, res) => {
    let slug = req.params.slug
    console.log(slug)
    let index = data.projectIndex[slug]
    let project = data.myProjects[index]
    res.render('projectDetails', {
        layout: 'layout',
        title: slug,
        nav: 'blogs',
        data: project
    })
})

module.exports = router;