const router = require('express').Router()
const data = require('../data').data
const Project = require('../models/projectSchema')
const ProjectService = require('../service/projectService')

router.get('/', (req, res, next) => {
    ProjectService.projectList().then((data) => {
        res.render('projects', {
            layout: 'layout',
            title: 'Projects',
            projects: data
        })
    }).catch((err) => {
        next(err)
    })
})

router.get('/:slug', (req, res, next) => {
    let slug = req.params.slug
    ProjectService.projectDetails(slug).then((data) => {
        res.render('projectDetails', {
            layout: 'layout',
            title: slug,
            nav: 'blogs',
            data: data
        })
    }).catch((err) => {
        next(err)
    })
})
module.exports = router;