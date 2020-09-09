const router = require('express').Router()
const data = require('../data').data
const BlogService = require('../service/blogService')


// let blogData = data.myBlog;
router.get('/', (req, res, next) => {
    console.log(data)
    BlogService.blogList().then((data) => {
        let randumNum = parseInt(Math.random() * data.length)
        console.log(data.blogCategories)

        res.render('blog', {
            layout: 'layout',
            title: 'blog',
            featuredBlog: data[randumNum],
            data,
            categories: data.blogCategories
        })
    })

})


router.get('/:slug', (req, res) => {
    let slug = req.params.slug
    let index = data.blogIndex[slug]
    let blog = data.myBlog[index]
    res.render('blogDetails', {
        layout: 'layout',
        title: slug,
        categories: data.blogCategories,
        data: blog
    })
})



module.exports = router