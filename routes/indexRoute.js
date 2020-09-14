const router = require('express').Router()
const UserService = require('../service/userService')
const ContactService = require('../service/contactService')
const User = require('../models/userSchema')

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

router.post('/signin', (req, res, next) => {
    let body = req.body
    console.log(req.body)
    User.findOne({ emailId: body.email }).then(data => {
        console.log('DB', data)
        if (data) {
            if (!data.comparePass(body.password)) {
                res.render('signin', {
                    layout: 'layout',
                    title: 'login',
                    message: 'Email or Password Incorrect'
                })
            } else {
                req.session.user = data
                req.session.isLoggedIn = true
                res.redirect('/admin')
            }
        } else {
            res.render('signin', {
                layout: 'layout',
                title: 'login',
                message: 'Email or Password Incorrect'
            })
        }
    }).catch(err => next(err))
})

router.get('/signup', (req, res) => {
    res.render('signup', {
        layout: 'layout',
        title: 'Signup',
        message: ""
    })
})

router.post('/signup', (req, res, next) => {
    let body = req.body;
    console.log(req.body)
    UserService.addUser(body).then((data) => {
        res.redirect('/signin')
    }).catch((err) => {
        next(err)
    })
})

router.post('/contact', (req, res, next) => {
    let body = req.body
    ContactService.addContactInfo(body).then((data) => {
        res.status(201).json({ message: "Contact saved successfully" })
    }).catch((err) => {
        next(err)
    })
})


module.exports = router;