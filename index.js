let express =  require('express');
let app  = express();

let Image = require('./model/Image');

app.use(express.static('public'));
app.use(express.json());
let dotenv =  require('dotenv');
let mongoose = require('mongoose');
dotenv.config();

mongoose.connect(process.env.DB_CONNECT,
    {useNewUrlParser: true}, 
    ()=>console.log('Connected to db')
    );

app.post('/api',async (req,res)=>{
    
    const img = new Image({
        lat: req.body.lat,
        lon: req.body.lon,
        image64: req.body.image64
        
    });
    console.log(img.image64);
    try{
        
        await img.save();
        res.json({task:"success"});
    }catch(err){
        res.status(400).send(err);
    }


});

app.get('/api',async(req,res)=>{
    try{
        await Image.find().exec(function(err, doc) {
        
            res.json(doc)});
        
    }
    catch(err){
        res.status(400).send(err);
    }
});

app.listen(3000, () => console.log("Listening to port 3000"));