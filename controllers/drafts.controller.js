var data = require('../data');

const mongoose= require('mongoose');


exports.saveDraft = (req,res) =>
{
    var x = {
        "Main_Details":req.body.Main_Details,
        "CO":req.body.CO,
        "PO":req.body.PO
    } 

    // console.log(x)
    // console.log("Hi")

      mongoose.connection.db.collection("Drafts").findOneAndUpdate(
        { "Subject_Code":req.body.Subject_Code },
        { $set: { "Subject_Code":req.body.Subject_Code,"Email":req.body.Email,"Data" : x} },
        { upsert:true, returnNewDocument : true },
        function(err, ans) {
            if (err) throw err;
            console.log("Saved Changes");
            res.send({message : 'Document Inserted'});
      }
     );
        // res.send({message : 'Document Already exists'});
    
};

exports.findDraft = (req,res) =>
{
        console.log(req.body.Email)  
        mongoose.connection.db.collection("Drafts").find(
            { "Email":req.body.Email }).toArray(
            function(err, ans) {
                if (err) throw err;
                if(ans)
                {
                    console.log(ans)
                    res.send(ans)
                }
          }
         );
        // res.send({message : 'Document Already exists'});
    
};