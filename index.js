const express = require("express");
const mongoose = require("mongoose");
const Person = require("./models/Person");

const app = express();

//forma de ler JSON / middlewares
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//rotas api

app.post("/person", async (req,res) =>{

const {name,salary,approved} = req.body;

const person = {
  name,
  salary,
  approved,
};

//create mongoose;

try{
await Person.create(person);
res.status(201).json({msg:"dado inserido com sucesso"})
} catch(erro){
  res.status(500).json({erro:erro});
}
});

//listando dados
app.get("/person",async (req,res) =>{

try{
let result = await Person.find();
res.status(200).json(result);
}catch(erro){
  res.status(400).json({erro:erro});
}
});


//deletando dados 
app.delete("/person", async(req,res) =>{
  
})



//rota inicial 
app.get("/",(req,res) =>{
  res.json({msg:"seja bem vindo"});
});


//conectando ao mongo
mongoose.set("strictQuery","false");
mongoose.connect("mongodb://localhost:27017/manager",{
  useNewUrlParser:true,
  useUnifiedTopology:true
}).then(() =>{
  console.log("banco de dado conectado com sucesso");
}).catch((erro) => {
  console.log(erro)
});





//habilitando porta
app.listen(4000,(erro) =>{
  if(erro){
    console.log("erro ao execultar");
  }else{
    console.log("servidor está online");
  }
});