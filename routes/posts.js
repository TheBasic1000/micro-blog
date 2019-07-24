'use strict';

const Post = require('../models/Post');

module.exports = function(router, passport) {
    // Add new post
    router.post('/add', isLoggedIn, function (req, res) {
        var post = new Post(req.body);
        post.author_username = req.user.username;
        post.author_name = req.user.name;
        post.time = new Date().toLocaleString();
        post.save()
        .then(post => {
        res.status(200).json({'post': 'post added successfully'});
        })
        .catch(err => {
        res.status(400).send("unable to save to database");
        });
    });

    // Return all posts that are created by the specific user
    router.get('/searchbyuser/:username', function (req, res) {
        Post.find({ author_username: req.params.username }, function (err, posts){
            if(err){
                console.log(err);
            }
            else {
                res.json(posts);
            }
        });
    });

    // Return all posts that contain the specific tag
    router.get('/searchbytag/:tag', function (req, res) {
        Post.find({ tags: req.params.tag }, function (err, posts){
            if(err){
                console.log(err);
            }
            else {
                res.json(posts);
            }
        });
    });

    // Return all posts
    router.get('/list', function (req, res) {
        Post.find({}, function (err, posts){
            if(err){
                console.log(err);
            }
            else {
                res.json(posts);
            }
        });
    });

    return router;
};

// Check if user is logged in
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();
    res.status(401).send('You are not authenticated');
};