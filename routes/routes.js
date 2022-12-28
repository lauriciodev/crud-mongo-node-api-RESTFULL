const express = require("express");
const Person = require("../models/Person");

const router = express.Router();


router.post("/person", async (req,res) =>{

  const {name,salary,approved} = req.body;
  if(!name ){
    res.status(400).json({msg:"name não pode ser vazio."})
    return
  }
  if(!salary){
    res.status(400).json({msg:"salary não pode ser vazio."})
    return
  
  }
  if(!approved){
    res.status(400).json({msg:"approved não pode ser vazio."})
    return
  
  }
  
  
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
router.get("/person",async (req,res) =>{

  try{
  let result = await Person.find();
  res.status(200).json(result);
  }catch(erro){
    res.status(400).json({erro:erro});
  }
  });
  
  
  //deletando dados 
  router.delete("/person/:id", async(req,res) =>{
    let id = req.params.id;
    try{
      await Person.findByIdAndDelete({"_id":id});
      res.status(200).json({msg:"usuario deletado com sucesso"});
    }catch(erro){
      res.status(404).json({msg:"erro ao deletar usuario"});
    }
  
  });
  
  
  //atualizando dados
  
  router.put("/person/", async(req,res) =>{
    let {id,name,salary,approved} = req.body;
    let dataBanco = await Person.findById(id);
    if(name == dataBanco.name){
      name = dataBanco.name;
    }
    if(salary == dataBanco.salary){
      salary = dataBanco.salary;
    }
    if(approved == dataBanco.approved){
      approved = dataBanco.approved;
    }
    try{
      await Person.findByIdAndUpdate(id,{name,salary,approved});
      res.send("dados atualizados com sucesso");
    }catch(erro){
     console.log(erro);
    }
     
  
  
  })
  



module.exports = router;