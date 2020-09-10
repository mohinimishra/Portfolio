const router = require('express').Router();
// const data = require('../data').data
let BlogService = require('../service/blogService')

router.get('/', (req, res) => {
    BlogService.blogList().then((data) => {
        res.render('about', {
            layout: 'layout',
            title: 'about',
            data: data
        })
    })
})

module.exports = router