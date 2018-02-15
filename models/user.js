//============================================================================//
/*SETUP*/
//============================================================================//
var mongoose = require('mongoose'),
    bcrypt = require('bcrypt');

//============================================================================//
/*Schema*/
//============================================================================//
/*Creates the User schema*/
var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
});

//============================================================================//
/*BCRYPT - HASHING AND SALTING*/
/*
  Hashing: Once the data is encoded, it can not be decoded. This is useful when
           storing things you don't need to read back, but need to check, like
           passwords.
  Salting: Salts work by adding extra secret values at the end of the input,
           extending the length of the original password.
*/
/*
  Next: If any middleware calls next or done with a parameter of type Error,
        the flow is interrupted, and the error is passed to the callback.
*/
//============================================================================//
/*Hashes a password before saving it the database*/
UserSchema.pre('save', function(next){
  var user = this;
  bcrypt.hash(user.password, 14, function(err, hash){
    if(err){
      return next(err);
    }
    user.password = hash;
    next();
  });
});

//============================================================================//
/*Sessions and Cookies*/
//============================================================================//
/*Authenticate input against database*/
UserSchema.statics.authenticate = function(email, password, callback){
  User.findOne({email: email}).exec(function(err, user){
    if(err){
      return callback(err);
    } else if(!user){
      var err = new Error('User not found.')
      err.status = 401;
      return callback(err);
    } bcrypt.compare(password, user.password, function(err, result){
        if(result == true){
          return callback(null, user);
        } else {
          return callback();
        }
    })
  });
}

//============================================================================//
/*Export*/
//============================================================================//
var User = mongoose.model('User', UserSchema);
module.exports = User;
