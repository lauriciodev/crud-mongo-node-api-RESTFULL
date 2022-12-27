const express = require("express");
const mongoose = require("mongoose");

const app = express();

//forma de ler JSON / middlewares
app.use(express.urlencoded({extended:true}));
app.use(express.json());



//rota inicial 

//habilitando porta
app.listen(3000,(erro) =>{
  if(erro){
    console.log("erro ao execultar");
  }else{
    console.log("servidor está online");
  }
});