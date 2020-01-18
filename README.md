# MicroBlog
## Description
[Demo video](https://www.youtube.com/watch?v=67sJ_u-rwxs)

The goal of this project was to implement a microblogging service using MEVN Stack. The general idea is that 
by signing up to this service, the user can publish new posts to the feed on the front page. Tags can also be 
added to help the user or other users to find posts on specific subject. With the "Search" functionality, 
one can search for posts either by username or tag. This functionality doesn't require registration. Finally, 
there's the "Profile" functionality which the user can use to inspect their user information.

## Docker-compose
To use the app, you need to run ```docker-compose```. That creates two containers: application server (includes static 
files generated with Vue) and Mongo server. You can use the app from port 3000.
