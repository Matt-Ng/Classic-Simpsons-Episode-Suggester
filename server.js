const mongoose = require('mongoose');
const express = require('express');
require('dotenv').config();
const app = express();
app.use(express.static('public'));
app.use(express.json());
mongoose.set('useFindAndModify', false);

app.listen(3000, ()=>{
    console.log("express server started on 3000");
});

const username = process.env.theUSERNAME;
const password = process.env.thePASSWORD;
// connect to db
mongoose.connect('mongodb+srv://' + username + ':' + password + '@classic-simpsons.bfiat.mongodb.net/Simpsons-Episodes?retryWrites=true&w=majority', {
    useNewUrlParser:true,
    useUnifiedTopology: true
});

// show that mongodb is successfully connected
const con = mongoose.connection;
con.on('open', function(){
    console.log('connected')
});
const Schema = mongoose.Schema;
const epiSchema = new Schema({
    title: String,
    season: String,
    episode: Number,
    airdate: String,
    description: String,
    link: String,
    rating: String,
    id: Number,
    likes: Number,
    dislikes: Number,
    imglink: String
});
// take episodes from mongodb as a model
const episode = mongoose.model('Episodes', epiSchema);

// have access to the public directory
app.use(express.static(__dirname + '/public'));

// root, main page
app.get('/', async (req,res) => {
    res.sendFile(`${__dirname}/public/index.html`);
});
// api get
app.get('/api', async (req,res) => {
    try{
        // get all json data under the episode model
        const data = await episode.find({ })
        res.json(data);
    }
    catch(e){
        console.log('error: ' + e);
    }
});

// like post
app.post('/like', (req, res) => {
    console.log(req.body.title);
    // update from specific id of episode, increment by one
    episode.updateOne({id: parseInt(req.body.id)}, {$inc: {likes: 1}}, (error) => {
        if(error){
            console.log("like failed");
        }
        else{
            console.log("like succeeded ");
        }
    })
    res.json({message: 'great success'});
});

// dislike post
app.post('/dislike', (req, res) => {
    console.log(req.body.title);
    // update from specific id of episode, increment by one
    episode.updateOne({id: parseInt(req.body.id)}, {$inc: {dislikes: 1}}, (error) => {
        if(error){
            console.log("dislike failed");
        }
        else{
            console.log("dislike succeeded ");
        }
    })
    res.json({message: 'great success'});
});