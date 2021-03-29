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

//GET
app.get('/user',(req,res)=>{
  res.send(users)
})

//GET by id
app.get('/user/:id', (req, res) => {
  const user = users.find(e => e.id === req.params.id)
  // console.log('user~~~~~~~~', user)
  if (!user) {
    res.status(404).send("所查询的用户ID不存在！");
    return;
  } else {
    res.send(user)
  }
})

//POST
app.post('/user/',(req,res)=>{
  // console.log('req!!!!', req)
  const schema = Joi.object().keys({
    login: Joi.string().required(),
    password: Joi.string().required(),
    age: Joi.number().required(),
    isDeleted: Joi.boolean().required()
  })
  const result = schema.validate(req.body)
  console.log('result!!!', result)
  if(result.error){
    res.status(400).send(result.error.details[0].message);
    return;
  }
  const user = {
    'id': (users.length + 1).toString(),
    'login': req.body.login, 
    'password': req.body.password,
    'age': req.body.age,
    'isDeleted': req.body.isDeleted
  }
  // console.log('new item', user)
  users.push(user);
  // console.log('new array', users)
  res.send(user);
})

//PUT
app.put('/user/:id',(req,res)=>{
  const user = users.find(e => e.id === req.params.id );
  console.log('user', user)
  if (!user) {
      res.status(404).send("给定的用户ID不存在！");
  } else {
      res.send(user);
  }
  //验证
  // const result = validateUser(req.body);
  // if(result.error){
  //     res.status(400).send(result.error.details[0].message);
  //     return;
  // };

  console.log('req~~~', req.body)

  user.login = req.body.login;
  user.password = req.body.password;
  user.age = req.body.age;
  user.isDeleted = req.body.isDeleted;

  res.send(user);
})

// function validateUser(user){
//   const schema = {
//     login:Joi.string().min(3).required()
//   };
//   return Joi.validate(user,schema);
// }

//DELETE
app.delete('/user/:id',(req,res)=>{
  const user = users.find(e => e.id === req.params.id)
  if (!user) {
    res.status(404).send("给定的用户ID不存在");
    return
  } else {
    res.send(user)
  }
  // console.log('req~~~~',user)
  // if (user.isDeleted === false) {
  //   user.isDeleted = true
  //   res.send(user);
  // } else {
  //   res.status(405).send("给定的用户已删除过！");
  //   return
  // }
  const index = users.indexOf(user)
  users.splice(index,1)
  res.send(user)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})