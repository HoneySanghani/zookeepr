const fs=require('fs');
const path=require('path');
const {animals}=require('./data/animals.json');
const express=require('express');
const { json } = require('express');
//for heroku to run the app
const PORT=process.env.PORT||3002;
const app=express();
const apiRoutes=require('./routes/apiRoutes');
const htmlRoutes=require('./routes/htmlRoutes');

//parse incoming string or array data
app.use(express.urlencoded({extended:true}));
//parse incoming json data
app.use(express.json());
app.use(express.static('public'));

app.use('/api',apiRoutes);
app.use('/',htmlRoutes);
app.listen(PORT,()=>{
  console.log(`API server now on port ${PORT}`);
});
