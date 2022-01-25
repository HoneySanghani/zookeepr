const { query } = require('express');
const fs=require('fs');
const path=require('path');

function filterByQuery(query,zookeepers){
    let filteredResults=zookeepers;
    if(query.age){
        filteredResults=filteredResults.filter(
            (zookeepers)=>zookeepers.age===Number(query.age)
        );
    }
    if(query.favoriteAnimal){
        filteredResults=filteredResults.filter(
            (zookeepers)=>zookeepers.favoriteAnimal===query.favoriteAnimal
        );
    }
    if(query.name){
        filteredResults=filteredResults.filter(
            (zookeepers)=>zookeepers.name===query.name
        );
    }
    return filteredResults;
}

function findById(id,zookeepers){
    const result=zookeepers.filter((zookeepers)=>zookeepers.id===query.id);
    return result;
}

function createNewZookeeper(body,zookeepers){
    const zookeeper=body;
    zookeepers.push(zookeeper);
    fs.writeFileSync(
        path.join(__dirname,"../data/zookeepers.json"),
        JSON.stringify({zookeepers},null,2)
    );
    return zookeepers;
}

function validateZookeeper(zookeepers){
    if(!zookeepers.name || typeof zookeepers.name !=="string"){
        return false;
    }
    if(!zookeepers.age || typeof zookeepers.age !=="number"){
        return false;
    }
    if(!zookeepers.favoriteAnimal || typeof zookeepers.favoriteAnimal !=="string"){
        return false;
    }
    return true;
}

module.exports={
    filterByQuery,
    validateZookeeper,
    createNewZookeeper,
    findById
}