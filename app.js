const express = require('express');
const app = express();
const partials = require('express-partials');
const { static } = require('express');

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/static'))
app.use(partials());


app.get('/', (req, res) => {
    res.render('portfolio', {
        layout: "",
        title: "Mohini",
        nav: 'home'
    })
})

app.get('/projects', function (req, res) {
    res.render('projects', {
        layout: 'layout',
        title: 'Projects',
    })
})

app.get('/projects/:slug', function (req, res) {
    let slug = req.params.slug
    res.render('projectDetails', {
        layout: 'layout',
        title: slug,
        nav: 'blogs'
    })
})

app.get('/blog', (req, res) => {
    res.render('blog', {
        layout: 'layout',
        title: 'blog'
    })
})

app.get('/blog:slug', (req, res) => {
    let slug = req.params.slug
    res.render('blogDetails', {
        layout: 'layout',
        title: slug
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        layout: 'layout',
        title: 'about'
    })
})


app.listen(3000, () => console.log("running on 3000"))