const express = require("express");

const app = express();

var User = require("../models/user_model");

app.post("/adduser", (req, res) => {
  const user = new User({
    name: req.body.username
  });

  user.save((err, user_saved) => {
    if (err) {
      res.status(500).json({
        ok: false,
        message: "Error on adding user",
        errors: err
      });
    } else {
      res.status(201).json({
        ok: true,
        message: "User created"
      });
    }
  });
});

app.put("/addconnection/", (req, res) => {
  const username_a = req.body.username_a;
  const username_b = req.body.username_b;

  Promise.all([
    findAUser(username_a),
    findAUser(username_b)
  ]).then(results=>{
    
    var user_a=results[0];
    var user_b=results[1];

      Promise.all([
        updateAUser(user_a,username_b),
        updateAUser(user_b,username_a)
      ]).then(result=>{
        res.status(200).json({
          ok:true,
          message:'Users connected'
        });
      }).catch(error=>{
        res.status(500).json({
          ok:false,
          message:'Error on update users',
          errors:error
        });
      });

  }).catch(err=>{
    res.status(400).json({
      ok:false,
      message:'Error on add connections',
      errors:err
    });
  });
});

app.get("/userconnections/:username", (req, res) => {
  User.find({ name: req.params.username }, (err, users) => {
    if (err) {
      res.status(400).json({
        ok:false,
        message:'Error on find user on userconnections',
        errors:err
      });
    } else if(users.length===0) {
      res.status(404).json({
        ok:false,
        message:'User not found',
        errors:err
      });
    }else{
      res.status(200).json({
        ok:true,
        message:"User connection",
        user_connections: users[0].connections
      });
    }
  });
});

app.get("/stats/", (req, res) => {

  Promise.all([
    countUsers(),
    findAllUsers()
  ]).then(result=>{

    const numUsers=result[0];

    const users_stats=result[1].map(user=>{
      return{
        username: user.name,
        percentage: user.connections.length / numUsers
      };
    });

    return res.status(200).json({
      ok:true,
      message:'Username and connections percent',
      users_stats
    });

  }).catch(err=>{
    return res.status(500).json({
      ok:false,
      message:'Error on find users or count users',
      errors:err
    });
  });

});

function countUsers() {
  return new Promise((resolve, reject) => {
    User.count({}, (err, count) => {
      if (err) {
        reject("Error on count users", err);
      } else {
        resolve(count);
      }
    });
  });
}

function findAllUsers() {
  return new Promise((resolve, reject) => {
    User.find({}, (err, users) => {
      if (err) {
        reject("Error on find users", err);
      } else {
        resolve(users);
      }
    });
  });
}

function findAUser(username) {

  return new Promise((resolve,reject)=>{
    User.find({name: username}, (err, users) => {
      if(err){
        reject('Error on find user',err);
      }else if(users.length===0){
        reject('User not exits');
      }else{
        resolve(users[0]);
      }
    });
  });
}

function updateAUser(user,username_to_connect) {

  return new Promise((resolve, reject) => {

    if(!user.connections.includes(username_to_connect)){
      user.connections.push(username_to_connect);
  
      user.save((err, user_saved) => {
  
        if(err){
          reject('Error on update user');
        }else{
          resolve(user_saved);
        }
      });
    }else{
      reject('User already connected');
    }

  });

}

module.exports = app;
