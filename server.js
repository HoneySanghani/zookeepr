const {animals}=require('./data/animals.json');
const express=require('express');
const { json } = require('express');
//for heroku to run the app
const PORT=process.env.PORT||3002;
const app=express();

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
app.listen(PORT,()=>{
  console.log(`API server now on port ${PORT}`);
});
