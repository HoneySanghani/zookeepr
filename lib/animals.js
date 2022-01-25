const fs=require("fs");
const path=require("path");

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
      path.join(__dirname,'../data/animals.json'),
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
  
  module.exports={
      filterByQuery,
      findById,
      createNewAnimal,
      validateAnimal
  };