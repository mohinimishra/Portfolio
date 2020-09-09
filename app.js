const express = require('express');
const app = express();
const partials = require('express-partials');
const { static } = require('express');
const mongoose = require('mongoose')
const middlewares = require('./middlewares/appMidleware')
const routes = require('./routes/index')
const session = require('express-session')
const indexRouter = require('./routes/indexRoute')
const projectRouter = require('./routes/projectRoute')
const blogRouter = require('./routes/blogRoute')
const aboutRouter = require('./routes/aboutRoute')
const adminRouter = require('./routes/adminRoute')

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/portfolio', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('DB connected Successfully'))
    .catch((err) => console.log('DB connection failed.', err))

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

app.use(middlewares.authenticated);

// app.get('/', routes.homepage)
// app.get('/contact', routes.contact)
// app.get('/signin', routes.signin)
// app.post('/signin', routes.login)

app.use('/', indexRouter)
app.use('/projects', projectRouter)
app.use('/blog', blogRouter)
app.use('/blogDetails', blogRouter)
app.use('/about', aboutRouter)
app.use('/admin', middlewares.authenticated, adminRouter)



// app.get('/projects', routes.projects)

// app.get('/projects/:slug', routes.projectDetails)

// app.get('/blog', routes.blog)

// app.get('/blogDetails/:slug', routes.blogDetails)

// app.get('/about', routes.about)




// app.get('/admin', middlewares.authenticate, routes.dashboard)
// app.get('/admin/project', middlewares.authenticate, routes.dashboardProjects)

// app.get('/admin/project/:slug', routes.formLayout)
// app.get('/admin/signout', routes.signOut)
// app.get('/admin/addProject', routes.addProject)

app.use(middlewares.notFound)
app.use(middlewares.errorHandler)

app.listen(3000, () => console.log("running on 3000"))