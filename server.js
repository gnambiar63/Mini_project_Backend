let express= require('express');

let mongoose= require('mongoose');

let bodyParser= require('body-parser');

let cors= require('cors');

let app=express();

var data = require('./data');

let link=data.CloudDBUrl;

const port=process.env.PORT || 3000;

app.listen(port,function(){
    mongoose.connect(link, { useCreateIndex: true, useNewUrlParser: true , useFindAndModify: false, useUnifiedTopology: true }, function(error){
        if(error)
        {
            console.log(error);
        }
        else{
            console.log("connection successful");
        }
    });
}
)

console.log("Server started");

app.get('/', (req, res) => res.send('Hello!'));

app.use(cors());    //to avoid proxy conflict

app.use(bodyParser.urlencoded({ extended: true }));     //to pass collective data
app.use(bodyParser.json());

app.use('/',require('./routes/user.route'));

