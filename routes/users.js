'use strict';

module.exports = function(router, passport) {
    router.get('/profile', isLoggedIn, function (req, res) {
        res.json({ username: req.user.username, name: req.user.name });
    });

    // Use passport to authenticate user during login
    router.post('/login', function(req, res, next) {
        passport.authenticate('local-login', function(err, user, info) {
            if (err) {
                return next(err); // will generate a 500 error
            }
            if (!user) {
                return res.send({ success : false, message : 'Login failed' });
            }
            req.login(user, function(err){
                if(err){
                    console.error(err);
                    return next(err);
                }
                return res.send({ success : true, message : 'Login succeeded' });
            });
        })(req, res, next);
    });

    // Log the user out and destroy the session
    router.get('/logout', function (req, res) {
        req.logout();
        req.session.destroy((err) => {
            res.clearCookie('connect.sid');
            res.send('Logged out');
        });
    });

    // Create new user if user details are ok
    router.post('/signup', function(req, res, next) {
        passport.authenticate('local-signup', function(err, user, info) {
            if (err) {
                return next(err); // will generate a 500 error
            }
            // Generate a JSON response reflecting signup
            if (!user) {
                return res.send({ success : false, message : 'Signup failed' });
            }
            return res.send({ success : true, message : 'Signup succeeded' });
        })(req, res, next);
    });

    router.get('/authenticate', function (req, res) {
        if (req.isAuthenticated())
            return res.json(true);
        return res.json(false);
    });

    return router;
};

// Check if user is authenticated
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.status(401).send('You are not authenticated');
};