// grab the things we need
var mongoose = require('mongoose');
var bcrypt=require('bcrypt');
var Schema = mongoose.Schema;

// create a schema
var user = new Schema({
  Email: { type: String, required: true, unique: true,trim: true },
  Password: { type: String, required: true,trim: true },
  Branch: { type: String, required: true,trim: true },
});

//This acts as a middleware where it modifies the password before storing it in the database.Alternate method to bcrypt

// user.pre('save', function(next)
// {
//   var pass=this;

//   if(!pass.isModified('Password'))  return next();

//   bcrypt.genSalt(5, function(err,salt)
//   {
//     if (err)  return next(err);

//     bcrypt.hash(pass.Password,salt,function(err,hash)
//     {
//       if (err)  return next(err);

//       pass.Password = hash;
//       next();
//     });
//   });

// });
user.methods.ValidatePassword = function(password,cb)
{
  bcrypt.compare(password,this.Password,function(err,isMatch)
  {
    if (err)  return cb(err);
    cb(null,isMatch);
  }); 
}

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', user);
// make this available to our users in our Node applications
module.exports = User;

