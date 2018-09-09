module.exports = (req, res, next) => {
    //next gets called when our middleware is complete
    if(!req.user){
        return res.user(401).send({error: 'You must log in!'});
    };
    
    //if there is a user, go to the next middleware
    next();
};