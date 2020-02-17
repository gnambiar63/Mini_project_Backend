
let bcrypt = require('bcrypt');

// let jwt = require('jsonwebtoken');

// var auth = require('../jwt');

var data = require('../data');

const User=require('../models/user.model');

// var HashedPassword = bcrypt.hashSync('Password',10);

exports.register = (req,res) =>
{
    var HashedPassword = bcrypt.hashSync(req.body.Password,10);
    User.findOne({ Email: req.body.Email },function(err,users)
    {
        if(err)
        {
            res.send('Something went wrong');
        }
        if(!users)
        {
            let user = new User(
                {
                    Email: req.body.Email,
                    Password: HashedPassword,
                    Branch: req.body.Branch
                });

            console.log(user);
            console.log("Sending");
            user.save((err) => {

                if (!err) {
                    console.log('Registered');
                    res.status(200).send({ message: 'Valid', Email:req.body.Email });
                    // router.get('/register', (req, res) => res.send("Success"));

                }
                else {
                    console.log('failure');
                    res.status(401).send({ message: 'Invalid', error: err });
                    console.log(err);
                    // router.get('/register', (req, res) => res.send("Try again"));
                }
            });
        }
        else
        {
            console.log('User already exists');
            res.send('User already exists');
        }
    });
    
};

exports.login = (req,res) =>
{
    console.log(req.body.Email);
    console.log(req.body.Password);
    User.findOne({ Email: req.body.Email },function(err,users)
    {
        if(err)
        {
            res.status(401).send('Something went wrong');
        }
        if(users)
        {
            // console.log(users);
            // console.log('Password is '+users.Password);
            bcrypt.compare(req.body.Password,users.Password,(er,ans) => 
            {
                if(er)
                {
                    res.status(401).send('Something went wrong');
                }
                // console.log(ans);  
                // console.log(req.body.Password);
                if(ans)
                {
                    console.log('Login Success');
                    res.json({message : 'Login of '+users.Email+' is successful',value : 1, fvalue: '', Email : users.Email});

                    // let user = {
                    //     email : users.email
                    // }

                    // jwt.sign(user,data.jwtSecretKey,{ expiresIn : '2h' },(erro,token) => 
                    // {
                    //     if(erro)
                    //     {
                    //         res.status(401).send({message : 'Authentication failure', MetaMessage : 'Token Genertion Failed'});
                    //     }
                    //     else{
                    //         res.status(200).send({message : 'Login of '+users.Email+' is successful',value : 1, fvalue: '', Email : users.Email});
                    //     }
                    // });

                }
                else
                {
                    console.log('Incorrect Password');
                    res.status(401).send({message : 'Incorrect Password', value : '' , fvalue : 1, Email : ''});
                }
            });
            console.log(users);

        }
        else
        {
            console.log('User not Found');
            res.status(404).send({message : 'User not found', value : '' , fvalue : 1, Email : ''});
        }
        
    });
};


