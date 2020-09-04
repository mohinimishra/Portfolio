const router = require('express').Router()

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



module.exports = router;