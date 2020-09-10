const router = require('express').Router()
const UserService = require('../service/userService')

router.get('/', (req, res) => {
    res.render('portfolio', {
        layout: "",
        title: "Mohini",
        nav: 'home'
    })
})

router.get('/contact', (req, res) => {
    res.render('contact', {
        layout: 'layout',
        title: 'contact'
    })
})

router.get('/signin', (req, res) => {
    res.render('signin', {
        layout: 'layout',
        title: 'signin',
        message: ""
    })
})

let db = [{
    name: 'mohini',
    email: "mohini@gmail.com",
    password: '12345'
},
{
    name: "MM",
    email: "mm@gmail.com",
    password: '123'
}]

router.post('/signin', (req, res) => {
    let body = req.body
    console.log(req.body)
    let user = db.filter((ele) => ((ele.email === body.email && ele.password === body.password)))
    if (user.length) {
        req.session.user = user[0]
        req.session.isLoggedIn = true
        res.redirect('/admin')
    } else {
        res.render('signin', {
            layout: 'layout',
            title: 'login',
            message: 'Email or Password Incorrect'
        })
    }
})

router.get('/signUp', (req, res) => {
    res.render('signUp', {
        layout: 'layout',
        title: 'SignUp',
        message: ""
    })
})

router.post('/signUp', (req, res, next) => {
    let body = req.body;
    console.log(req.body)
    UserService.addUser(body).then((data) => {
        res.redirect('/signin')
    }).catch((err) => {
        next(err)
    })
})



module.exports = router;