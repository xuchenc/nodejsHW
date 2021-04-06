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
    isDeleted: true
  },
  {
    id: '3',
    login: 'web3',
    password: '333333',
    age: 3,
    isDeleted: true
  },
  {
    id: '4',
    login: 'web4',
    password: '444444',
    age: 4,
    isDeleted: true
  },
  {
    id: '5',
    login: 'web5',
    password: '555555',
    age: 5,
    isDeleted: false
  },
]

app.use(express.json())


//GET by loginSubstring & limit
app.get('/user',(req,res)=>{
  const loginSubstring = req.body.loginSubstring
  const limit = req.body.limit
  if (loginSubstring) {
    const filterArray = users.filter((e) => e.login.includes(loginSubstring))
    // console.log('filterArray!!!', filterArray.length)
    if (limit && filterArray.length > limit) {
      const newArray = filterArray.slice(0, limit)
      // console.log('newArray!!!', newArray)
      res.send(newArray)
    } else {
      // console.log('filterArray!!!', filterArray)
      res.send(filterArray)
    }
  } else {
    res.send(users)
  }
})

//GET by id
app.get('/user/:id', (req, res) => {
  const user = users.find(e => e.id === req.params.id)
  if (!user) {
    res.status(404).send("所查询的用户ID不存在！");
    return;
  } else {
    res.send(user)
  }
})

//POST
app.post('/user/',(req,res)=>{
  const schema = Joi.object().keys({
    login: Joi.string().required(),
    password: Joi.string().required(),
    age: Joi.number().required(),
    isDeleted: Joi.boolean().required()
  })
  const result = schema.validate(req.body)
  // console.log('result!!!', result)
  if(result.error){
    res.status(400).send(result.error.details[0].message);
    return;
  }
  const reg = /^(\d+[a-zA-Z]+|[a-zA-Z]+\d+)([0-9a-zA-Z]*)$/;
  if(!reg.test(result.value.password)) {
    res.status(401).send("password必须为数字和字母！");
    return;
  }
  if(result.value.age < 4 || result.value.age > 130) {
    res.status(401).send("输入的必须在4-130之间！");
    return;
  }
  const user = {
    'id': (users.length + 1).toString(),
    'login': req.body.login, 
    'password': req.body.password,
    'age': req.body.age,
    'isDeleted': req.body.isDeleted
  }
  users.push(user);
  res.send(user);
})

//PUT
app.put('/user/:id',(req,res)=>{
  const user = users.find(e => e.id === req.params.id );
  // console.log('user', user)
  if (!user) {
    res.status(404).send("给定的用户ID不存在！");
    return
  }

  //验证
  const schema = Joi.object().keys({
    login: Joi.string().required(),
    password: Joi.string().required(),
    age: Joi.number().required(),
    isDeleted: Joi.boolean().required()
  })
  const result = schema.validate(req.body)
  // console.log('result!!!', result)
  if(result.error){
    res.status(400).send(result.error.details[0].message);
    return;
  }
  // console.log('req~~~', req.body)
  const reg = /^(\d+[a-zA-Z]+|[a-zA-Z]+\d+)([0-9a-zA-Z]*)$/;
  if(!reg.test(req.body.password)) {
    res.status(401).send("password必须为数字和字母！");
    return;
  }
  if(req.body.age < 4 || req.body.age > 130) {
    res.status(401).send("输入的必须在4-130之间！");
    return;
  }
  
  user.login = req.body.login;
  user.password = req.body.password;
  user.age = req.body.age;
  user.isDeleted = req.body.isDeleted;

  res.send(user);
})

//DELETE
app.delete('/user/:id',(req,res)=>{
  const user = users.find(e => e.id === req.params.id)
  if (!user) {
    res.status(404).send("给定的用户ID不存在");
    return
  } 
  // console.log('req~~~~',user)
  if (user.isDeleted === false) {
    // const index = users.indexOf(user)
    // users.splice(index,1)
    // res.send(user)
    user.isDeleted = true
    res.status(200).send("删除success~");
    // res.send(user)
  } else {
    res.status(408).send("给定的用户已删除过~");
    return
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})                                 