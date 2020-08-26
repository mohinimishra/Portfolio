const express = require('express');
const app = express();
const partials = require('express-partials');
const { static } = require('express');
const middlewares = require('./middlewares/appMidleware')
const routes = require('./routes/index')
const session = require('express-session')

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/static'))
app.use(partials());
app.use(middlewares.logger)
app.use(express.urlencoded({ extended: false }))
app.use(session({
    secret: 'mohini@93@93',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000000 }
}))

app.get('/', routes.homepage)

app.get('/projects', routes.projects)

app.get('/projects/:slug', routes.projectDetails)

app.get('/blog', routes.blog)

app.get('/blogDetails/:slug', routes.blogDetails)

app.get('/about', routes.about)

app.get('/contact', routes.contact)

app.get('/signin', routes.signin)
app.post('/signin', routes.login)

app.get('/dashboard', middlewares.authenticated, routes.dashboard)

app.use(middlewares.notFound)
app.use(middlewares.errorHandler)

app.listen(3000, () => console.log("running on 3000"))