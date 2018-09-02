const passport = require('passport');

module.exports = (app) => {

    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']// access to user profile and email
    })
    );

    app.get('/api/logout', (req,res) => {
        req.logout(); //automatically attached by passport to the req object
        res.send(req.user);
    });
    
    app.get('/auth/google/callback', passport.authenticate('google'));

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });

}


