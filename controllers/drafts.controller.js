var data = require('../data');


exports.save_drafts = (req,res) => 
{
    var x = {
        CO : req.body.CO
    }

    db.createCollection("Drafts");
}