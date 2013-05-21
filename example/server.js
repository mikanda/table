
/**
 * Module dependencies.
 */

var express = require('express')
  , app = express();

// middleware

app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.static(__dirname));
app.use(express.static(__dirname + '/..'));

// faux db

var db = { pets: [], users: [{
  id: 0,
  title: 'Mr',
  forename: 'Test',
  surname: 'User',
  birthdate: new Date,
  email: 'e@mail.com'
},{
  id: 1,
  title: 'Mrs',
  forename: 'Be',
  surname: 'Nutzer',
  birthdate: new Date,
  email: 'be@nutzer.com'
}] };

// routes

// users

/**
 * DELETE all users.
 */

app.del('/user/all', function(req, res){
  db.users = [];
  res.send(200);
});


/**
 * DELETE all users.
 */

app.del('/user/:id', function(req, res){
  var user = db.users[req.params.id];
  if (!user) return res.send(404, 'cant find user');
  db.users.splice(user.id, 1);
  res.send(200);
});

/**
 * GET all users.
 */

app.get('/user/all', function(req, res){
  res.send(db.users);
});

/**
 * POST a new user.
 */

app.post('/user', function(req, res){
  var user = req.body;
  var id = db.users.push(user) - 1;
  user.id = id;
  res.send({ id: id });
});

/**
 * update a user
 */

app.put('/user/:id', function(req, res){
  var user = db.users[req.params.id] = req.body;
  res.send({ id: user.i });
});

app.listen(3000);
console.log('test server listening on port 3000');