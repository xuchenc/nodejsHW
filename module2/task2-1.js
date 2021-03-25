// const express = require('express')
import express from 'express'
import Joi from 'joi'
const app = express()
const port = 3000

const users = [
  {
    id: '1',
    login: 'web1',
    password: '111111',
    age: 1,
    isDeleted: false
  },
  {
    id: '2',
    login: 'web2',
    password: '222222',
    age: 2,
    isDeleted: false
  },
]

app.use(express.json())

app.get('/user',(req,res)=>{
  res.send(users)
})

app.get('/user/:id', (req, res) => {

  const user = users.find(e => e.id === req.params.id)
  // console.log('user~~~~~~~~', user)
  if (!user) {
    //404
    res.status(404).send("所查询的用户ID不存在！");
  } else {
    res.send(user)
  }
})

app.post('/user/',(req,res)=>{
  const schema = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().required(),
    age: Joi.number().required(),
    isDeleted: Joi.boolean().required()
  })
  const result = schema.validate(req.body)
  console.log('result!!!', result)
  if(result.error){
    res.status(400).send(result.error.details[0].message);
  }
  const user = {
    'id': (users.length + 1).toString(),
    'login': req.body.login,
    'password': req.body.password,
    'age': req.body.age,
    'isDeleted': req.body.isDeleted
  }
  console.log('new item', user)
  users.push(user);
  console.log('new array', users)
  res.send(user);
})



app.delete('/user/:id',(req,res)=>{
  //查找
  const user = users.find(e => e.id === req.params.id)
  if (!user) {
    //404
    res.status(404).send("给定的书籍ID不存在");
    return
  } else {
    res.send(user)
  }
  
  const index = users.indexOf(user)
  users.splice(index,1)
  res.send(user)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})