const User = require('../app/models/users')
const Meal = require('../app/models/users')
const loggedIn = require('../config/passport')

module.exports = (app, passport) => {
    
    app.get('/', (req, res) => {
        res.render('index')
        /*if(isLoggedIn) {
            console.log(user)
        }
        else {
            console.log('you are not logged in')
        }*/
    });
    
    app.post('/addMeal', (req, res) => {
        
        if(isLoggedIn) {
            let meal = new Meal({
                title: req.body.title
            })

            meal.save((err) => {
                if(err) {
                    throw(err)
                }
                else {
                    console.log('a meal has been saved sucsesfully')
                }
            })
            //console.log(User)
        }
        else {
            console.log('not logged in')
            res.redirect('/login')
        }
        res.redirect('/')
    })

    app.get('/login', (req, res) => {
        res.render('login', { message: req.flash('loginMessage') }); 
    });
    
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/graph',
        failureRedirect : '/login', 
        failureFlash : true 
    }))

    app.get('/signup', (req, res) => {
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });
    
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/graph', 
        failureRedirect : '/signup', 
        failureFlash : true 
    }));

    app.get('/graph', isLoggedIn, (req, res) => {
        if(isLoggedIn) {
            res.render('graph', {
                user : req.user 
            });
        }
        else {
            res.redirect('/')
        }
    });
    
    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/')
    });
};

function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())
        return next()
    
    res.redirect('/')
}