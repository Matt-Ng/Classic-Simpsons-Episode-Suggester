const title = document.getElementById("title");
const seasonepisode = document.getElementById("seasonepisode");
const airdate = document.getElementById("airdate");
const description = document.getElementById("description");
const imdblink = document.getElementById("imdblink");
const rating = document.getElementById("rating");
const likesdislikes = document.getElementById("likesdislikes");
const epiImg = document.getElementById("epiImg");
const genBtn = document.getElementById("gennew");
const like = document.getElementById("like");
const dislike = document.getElementById("dislike");


// invoke genEpi on load
genEpi();

// all the api data is stored in data array, curr is the current episode number the website is using
var data;
var curr = 0;
// generate a random episode number and get data from the getdata function
async function genEpi(){
    console.log("click");
    // enable the like and dislike buttons again when the another episode is loaded
    document.getElementById("like").disabled = false;
    document.getElementById("dislike").disabled = false;
    var epiNum = Math.floor(Math.random() * 174);
    console.log("num: " + epiNum);
    getData(epiNum);
}

// updates the pertinent details on the page
async function getData(epiIndex){
    const response = await fetch('/api');
    data = await response.json();
    epiData = data[epiIndex];
    curr = epiIndex;
    console.log("Title: " + epiData.title + " Season: " + epiData.season + " Episode: " + epiData.episode + " Aired: " + epiData.airdate);
    // input all data onto the html
    title.innerHTML = epiData.title;
    seasonepisode.innerHTML = "Season " + epiData.season + " Episode: " + epiData.episode;
    airdate.innerHTML = "Aired: " + epiData.airdate;
    description.innerHTML = epiData.description;
    imdblink.innerHTML = epiData.link;
    imdblink.href = epiData.link;
    rating.innerHTML = "Average IMDb rating " + epiData.rating;
    likesdislikes.innerHTML = epiData.likes + " Likes " + epiData.dislikes + " Dislikes ";
    epiImg.src = epiData.imglink;
}

// for like
async function updateLike(){
    console.log("like was pressed");
    
    console.log(data[curr]);
    try{
        // post request to /like, updates the like counter in the api
        const res = await fetch('/like', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data[curr])});
        console.log(res);
        const done = await res.json();
        console.log(done);
        // update the count on the front end
        likesdislikes.innerHTML = (++epiData.likes) + " Likes " + epiData.dislikes + " Dislikes ";
    }
    catch(e){
        console.log(e);
    }
    // when like or dislike is pressed, user cannot have other input
    document.getElementById("like").disabled = true;
    document.getElementById("dislike").disabled = true;
}

// dislike
async function updateDislike(){
    console.log("dislike was pressed");
    console.log(data[curr]);
    try{
        // post request to /dislike, updates the dislike counter in the api
        const res = await fetch('/dislike', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data[curr])});
        console.log(res);
        const done = await res.json();
        console.log(done);
        // update the count on the front end
        likesdislikes.innerHTML = epiData.likes + " Likes " + (++epiData.dislikes) + " Dislikes ";
    }
    catch(e){
        console.log(e);
    }
    // when like or dislike is pressed, user cannot have other input
    document.getElementById("like").disabled = true;
    document.getElementById("dislike").disabled = true;
}

genBtn.addEventListener('click', genEpi, false);
like.addEventListener('click', updateLike, false);
dislike.addEventListener('click', updateDislike, false);