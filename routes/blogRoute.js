const router = require('express').Router()
const data = require('../data').data
const BlogService = require('../service/blogService')


// let blogData = data.myBlog;
router.get('/', (req, res, next) => {
    BlogService.blogList().then((data) => {
        console.log('Db Data', data)

        let randumNum = parseInt(Math.random() * data.length)
        // console.log(data.blogCategories)

        res.render('blog', {
            layout: 'layout',
            title: 'blog',
            featuredBlog: data[randumNum],
            data,
            // categories: data.blogCategories
        })
    })

})


router.get('/:slug', (req, res, next) => {
    let slug = req.params.slug
    BlogService.blogDetail(slug).then((data) => {
        res.render('blogDetails', {
            layout: 'layout',
            title: slug,
            // categories: data.blogCategories,
            data: data
        })
    }).catch((err) => {
        next(err)
    })
    // let index = data.blogIndex[slug]
    // let blog = data.myBlog[index]

})



module.exports = router