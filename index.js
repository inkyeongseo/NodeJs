
const express = require('express') //express모듈 가져오기
const app = express()
const port = 5000

const{User} = require("./models/User");
const bodyParser = require('body-parser');


//application/x-www-form-urlencoded   
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//appplication/json  json 형태로 파싱


const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://inkyeong:inkyeong@cluster0.msxuf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify:false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/register',(req,res) =>{
  
  //회원가입 할 때 필요한 정보들을 client에서 가져오면
  //그것들을 데이터 베이스에 넣는다.
  
  const user = new User(req.body)
  //body-parser가 있어서 request body로 받을 수 있다.

  user.save((err,userInfo)=>{
    if(err) return res.json({success: false,err})
    return res.status(200).json({
      success: true
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})