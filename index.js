const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/routes");
const app = express();

//forma de ler JSON / middlewares
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use("/",router);

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