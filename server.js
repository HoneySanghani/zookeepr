const fs=require('fs');
const path=require('path');
const {animals}=require('./data/animals.json');
const express=require('express');
const { json } = require('express');
//for heroku to run the app
const PORT=process.env.PORT||3002;
const app=express();

//parse incoming string or array data
app.use(express.urlencoded({extended:true}));
//parse incoming json data
app.use(express.json());
app.use(express.static('public'));
function filterByQuery(query,animalArray){
  let personalityTraitsArray=[];
  let filteredResults=animalArray;
  if(query.personalityTraits){
    //checks if personalityTrait is string or not and it it is a string then it makes a array of it.
    if(typeof query.personalityTraits==='string'){
      personalityTraitsArray=[query.personalityTraits];
    }
    else{
      personalityTraitsArray=query.personalityTraits;
    }
    personalityTraitsArray.forEach(trait=>{
      filteredResults=filteredResults.filter(
        animal=>animal.personalityTraits.indexOf(trait)!== -1
      );
    });
  }
  if(query.diet){
    filteredResults=filteredResults.filter(animal=>animal.diet===query.diet);
  }
  if(query.species){
    filteredResults=filteredResults.filter(animal=>animal.species===query.species);
  }
  if(query.name){
    filteredResults=filteredResults.filter(animal=>animal.name===query.name);
  }
  return filteredResults;
}

function findById(id,animalArray){
  const result=animalArray.filter(animal=>animal.id===id)[0];
  return result;
}

function createNewAnimal(body,animalsArray){
  const animal=body;
  animalsArray.push(animal);
  fs.writeFileSync(
    path.join(__dirname,'./data/animals.json'),
    JSON.stringify({animals:animalsArray},null,2)
  );
  return animal;
}

function validateAnimal(animal){
  if(!animal.name||typeof animal.name!=='string'){
    return false;
  }
  if(!animal.species||typeof animal.species!=='string'){
    return false;
  }
  if(!animal.diet||typeof animal.diet!=='string'){
    return false;
  }
  if(!animal.personalityTraits||typeof animal.personalityTraits=='string'){
    return false;
  }
  else{
    return true;
  }
}


app.get('/api/animals',(req,res)=>{
  let results=animals;
  if(req.query){
    results=filterByQuery(req.query,results);
  }
  res.json(results);
});

app.get('/api/animals/:id',(req,res)=>{
  const result=findById(req.params.id,animals);
 if(result){
  res.json(result);
 }
 else{
   res.send(404);
 }
});

app.post('/api/animals',(req,res)=>{
  req.body.id=animals.length.toString();
  if(!validateAnimal(req.body)){
    res.status(400).send('The animal is not properly formatted.');
  }
  else{
    const animal=createNewAnimal(req.body,animals);
    res.json(animal);
  }
});

app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname,'./public/index.html'));
});

app.get('/animals',(req,res)=>{
  res.sendFile(path.join(__dirname,'./public/animals.html'));
});

app.get('/zookeepers',(req,res)=>{
  res.sendFile(path.join(__dirname,'./public/zookeepers.html'));
});

//wildcard routes
app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'./public/index.html'));
})
app.listen(PORT,()=>{
  console.log(`API server now on port ${PORT}`);
});
