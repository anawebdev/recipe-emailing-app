const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');


// USER SERIALIZATION

passport.serializeUser((user, done) => {
    done(null, user.id);//no the profile id, it's the mongodb id
})
// user obj that we just pulled from the database

passport.deserializeUser((id, done ) => {
    User.findById(id)
        .then(user => {
            done(null, user); //done always takes an err 
        })
});


// AUTHENTICATION LOGIC 

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback', //route user gets gets sent to after granting permission to our app
    proxy: true
}, (accessToken, refreshToken, profile, done)=>{
    User.findOne({googleID: profile.id})
        .then((existingUser)=>{
            if(existingUser) {
                //we already have a record of the user
                done(null, existingUser); //first argument is err
            } else {

                //make a new record
                new User({ googleID: profile.id }).save() //creates new model instance
                    .then(user => done(null, user)); //second model instance  - updated
            }
        })
    
}));