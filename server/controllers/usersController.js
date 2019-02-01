const db = require("../models");
const jwt = require('jsonwebtoken');


const secret = process.env.jwtSecret
// Defining methods for the booksController
const controller = {
  getUserPins: (req, res) => {
    db.User.findOne({
      where: {
        username: req.params.username
      }
    })
    .then(user => {

      if(!user) {
        res.send("no user")
      }
      else {
        console.log(user.pins)
        const userPins = user.pins
        res.send(JSON.parse(userPins))
      }
    }
      ).catch(res => console.log(res))
  },
  updateProfile: (req, res) => {
    db.User.update({
      description: req.body.description,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    }, {
      where: {
        username: req.body.username
      }
    })
    .then(user => res.status(200).send({
     "code": 200
     
    }))
    .catch(err => res.status(422).json(err));
  },
  authUser: (req, res) => {
    let authenticateUser;
     jwt.verify(req.body.userToken, secret, function(err, decoded) {      
     if (err) {
       return res.json({ success: false, message: 'Failed to authenticate token.' });    
     } else {

      //if everything is good, save to request for use in other routes
       req.decoded = decoded;    
      authenticateUser= decoded.currentUser.currentUser.userId  
        return authenticateUser   
     }
   });
  console.log( authenticateUser)
    db.Users.findOne({
      where: {
        id:authenticateUser
      }
    })
      .then(user => {

         
       const userInfo={
        username: user.username,
        email: user.email
        }
        res.json(userInfo)
      })
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.User.findOne({
      where: {
        id: req.params.id
        
      }
    })
    .then(dbModel => {
      if(dbModel) {
        res.json(dbModel);
      }
      else {
        res.status(404).json({
          message: "Id not found."
        });
      }
    })
    .catch(err => res.status(422).json(err));
  },
  createUser: function(req,res) {
    db.User.findOne({where:{ username: req.body.username }})
    .then(function (user) {
      if(!user){
        User.create({ 
          username: req.body.username, 
          password: req.body.password, 
          email: req.body.email,
          pins: '',
          firstname: '',
          lastname: '',
        })
 
      } else {
        res.status(404).json('Username already exists!');
      }
    })
    .catch(function (err) {
      res.send('Error creating user: ', err.message);
    });
},
logIn: function(req, res) {
  db.User.findOne({
    where:{
      username: req.body.username
    }
  })
  .then(function(user){
    if(!user){
      res.send("Username not found")
    }
    else {

      if (req.body.password === user.password){
        const currentUser = {
          username: user.username,
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
          description: user.description
        }
        const token = jwt.sign({
          auth: user.username,
          agent: req.headers['user-agent'],
          currentUser:{ currentUser },
          exp: Math.floor(new Date().getTime() / 1000) + 7 * 24 * 60 * 60, // Note: in seconds!
        }, secret);


        res.send({
          "token": token,
          "code":200,
          "loggedIn": true,
          "success":"Login successful",
          "username": user.username,
          "email": user.email,
          "firstname": user.firstname,
          "lastname": user.lastname,
          "description": user.description
            });
      }
      else {
        res.send({
          "code":204,
          "success":"Username and password do not match"
            });
      }
    }
  })
},
  create: function(req, res) {
    db.User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      pins: req.body.pins
    })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.User.delete({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    }, {
      where: {
        id: req.params.id
      }
    })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err))
  }
}

export { controller as default };