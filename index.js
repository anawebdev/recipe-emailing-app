const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

require('./models/User.js');
require('./models/Survey.js');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express(); //generates a new app

//express middlewares - are wired up to express by app.use();

// when a request comes into the app, bodyParser will parse and assign it to req.body
app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, //how long can the cookie stay inside the browser before it automatically expires in miliseconds -- this is 30 days
        keys: [keys.cookieKey] //safety -- we can specify multiple keys that will randomly be picked - that's why it's an array

    })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

//only in production
if(process.env.NODE_ENV === 'production') {
    // Express will serve up production assets like main.js or main css
    app.use(express.static('client/build'));//if a get req comes in for a route or file in the app and we dont understant what it s for look into build folder and see if we find smth there that matches


    // Express will serve up the index.html file if it doesnt recognize the route
    const path = require('path');
    app.get('*',(req, res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
};

const PORT = process.env.PORT || 5000;
app.listen(PORT);