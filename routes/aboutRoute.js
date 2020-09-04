const router = require('express').Router();
const data = require('../data').data


router.get('/', (req, res) => {
    let blog = data.blogIndex
    let blogInd = Object.keys(blog)
    res.render('about', {
        layout: 'layout',
        title: 'about',
        blogInd
    })
})

module.exports = router