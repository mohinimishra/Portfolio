const express = require('express');
const app = express();
const partials = require('express-partials');
const { static } = require('express');
const middlewares = require('./middlewares/appMidleware')
const routes = require('./routes/index')

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/static'))
app.use(partials());
app.use(middlewares.logger)

app.get('/', routes.homepage)

app.get('/projects', routes.projects)

app.get('/projects/:slug', routes.projectDetails)

app.get('/blog', routes.blog)

app.get('/blog:slug', routes.blogDetails)

app.get('/about', routes.about)

app.use(middlewares.notFound)
app.use(middlewares.errorHandler)

app.listen(3000, () => console.log("running on 3000"))