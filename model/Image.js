const mongoose =  require('mongoose');

const messageSchema =  new mongoose.Schema({

    lat:{
        type: String,
        min: 0,
        max: 255
    },
    
    lon:{
        type: String,
        min: 0,
        max: 255
    },

    image64:{
        type: String
     
        
    }


});


module.exports = mongoose.model('Image',messageSchema);