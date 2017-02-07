const Express = require('express');
const router = Express.Router();
const faker = require('faker');
const pg = require('pg');

const config = {
  user: 'bern',
  database: 'tweetDB',
  password: '',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000,
};

const pool = new pg.Pool(config);


router.get('/', function(request, response){
  response.render('home/index');
});

router.get('/dashboard', function(request, response){
  pool.connect(function(err,client,done){
    if(err){
      console.error('DB Pool Connection Error');
    }
    // stretch sort by character length  ------------------------->👇
    client.query('SELECT * FROM "tweetTable" ORDER BY CHAR_LENGTH(tweet);', function(qErr, result){
      done();
      if (qErr) {
        return console.error('SELECT Query Error');
      }
      const tweets = [];
      result.rows.forEach(function(x){
        tweets.push(x.tweet);
      });
      const names = [];
      result.rows.forEach(function(x){
        names.push(x.name);
      });
      const dates = [];
      result.rows.forEach(function(x){
        dates.push(x.date);
      });
      console.log(tweets);
      response.render('home/dashboardDB', {tweets: tweets, names: names, dates: dates, faker: faker})
    });
  });
});

router.post('/dashboard', function(request, response){
  pool.connect(function(err,client,done){
    if(err) {
      return console.error("DB Pool Connection Error")
    }
    client.query('INSERT INTO "tweetTable" (name, tweet, date) VALUES ($1, $2, $3);', [request.body.name, request.body.tweet, request.body.dates], function(qErr, result){
      done();
      if (qErr) {
        return console.error('INSERT Query Error');
      }
      response.redirect('/dashboard');
    });
  });
});

module.exports = router;
