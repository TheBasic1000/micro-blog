'user strict';

var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/User');

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // Strategy for signup
    passport.use('local-signup', new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, username, password, done) {
        process.nextTick(function() {

        User.findOne({ 'username' : username }, function(err, user) {
            if (err)
                return done(err);
            if (user) {
                return done(null, false, {errMsg: 'That username is already taken'});
            } else {
                var newUser = new User();

                newUser.username = username;
                newUser.name = req.body.name;
                newUser.password = newUser.generateHash(password);

                newUser.save(function(err) {
                    if (err) {
                        if(err.message == 'User validation failed') {
                            return done(null, false, {errMsg: 'Please fill all fields'});
                        }
                        console.error(err);
                        return done(err);
                    }
                    return done(null, newUser);
                });
            }
        });    
        });
    }));

    // Strategy for login
    passport.use('local-login', new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, username, password, done) {
        User.findOne({ 'username' : username }, function(err, user) {
            if (err)
                return done(err);
            if (!user) {
                return done(null, false, {errMsg: 'User does not exist, please sign up'});
            }
            if (!user.validPassword(password)) {
                return done(null, false, {errMsg: 'Invalid password try again'});
            }
            return done(null, user);
        });
    }));

    return passport;
};