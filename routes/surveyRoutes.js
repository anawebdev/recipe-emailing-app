const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');

const Survey = mongoose.model('surveys');// we can use the model class to create an instance of a survey

// check if logged in && if user has enough credits (at least 1)
module.exports = app => {
    app.post('/api/surveys', requireLogin, requireCredits, (req,res)=>{
        const { title, subject, body, recipients } = req.body;

        const survey = ({
            title,
            body,
            subject,
            recipients: recipients.split(',').map(email => ({ email: email.trim() }) ),
            _user: req.user.id,
            dateSent: Date.now(),
        });
    });
};