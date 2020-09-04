const router = require('express').Router()
const data = require('../data').data

const mongodb = require('mongodb').MongoClient;

let db;
mongodb.connect('mongodb://localhost:27017', function (err, client) {
    if (err) {
        console.log(err)
    } else {
        db = client.db('portfolio')
    }
})

let blogData = data.myBlog;

router.get('/', (req, res) => {
    let blogCollection = db.collection('blog')
    blogCollection.find().toArray((err, data) => {
        if (err) {
            console.log(err)
        } else {
            console.log(data)
            let randumNum = parseInt(Math.random() * blogData.length)
            res.render('blog', {
                layout: 'layout',
                title: 'blog',
                featuredBlog: data[randumNum],
                data,
                categories: data.blogCategories
            })
        }
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