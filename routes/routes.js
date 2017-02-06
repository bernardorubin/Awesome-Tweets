const Express = require('express');
const router = Express.Router();
const faker = require('faker');
const cookieParser = require('cookie-parser');

router.get('/', function(request, response){
  response.render('home/index');
});

router.get('/dashboard', function(request, response){
  const cookies = request.cookies;
  if (cookies.tweet) {
    response.render('home/dashboard', {cookies: cookies, faker:faker});
  } else {
    response.render('home/dashboard',{ name: "", tweet: "", dates: ""});
    }
});

router.post('/dashboard', function(request, response){
  const params = request.body;
  const cookies = request.cookies;
  if (cookies.tweet) {
      response.clearCookie('tweet');
      // response.clearCookie('name');
      // response.clearCookie('date');
      response.cookie('name', params.name +`,${cookies.name}`);
      response.cookie('tweet', params.tweet +`,${cookies.tweet}`);
      response.cookie('dates', params.dates +`,${cookies.dates}`);
  } else {
  response.cookie('name', params.name);
  response.cookie('tweet', params.tweet);
  response.cookie('dates', params.dates);
  }
  response.redirect('/dashboard');
});

module.exports = router;
