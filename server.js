const {animals}=require('./data/animals.json');
const express=require('express');
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
app.get('/api/animals',(req,res)=>{
  let results=animals;
  if(req.query){
    results=filterByQuery(req.query,results);
  }
  res.json(results);
});
app.listen(3002,()=>{
  console.log('API server now on port 3002');
})