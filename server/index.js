
const express = require('express') //express모듈 가져오기
const app = express()
const port = 5000

const{User} = require("./models/User");
const bodyParser = require('body-parser');
const cookieparser = require('cookie-parser');

const{auth}= require('./middleware/auth');
const config = require('./config/key')

//application/x-www-form-urlencoded   
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//appplication/json  json 형태로 파싱

app.use(cookieparser())

const mongoose = require('mongoose');
const { json } = require('body-parser');

mongoose.connect(config.mongoURI,{
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify:false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World! 변경 테스트')
})

app.post('/api/users/register',(req,res) =>{
  
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


app.post('/api/users/login',(req,res) =>{
  //1.요청된 이메일을 데이터베이스에서 있는지 찾는다.
  User.findOne({email: req.body.email}, (err,user)=>{
    if(!user){
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }
  //2.요청된 이메일이 있다면 비밀번호가 맞는지 확인한다.
    user.comparePassword(req.body.password, (err,isMatch)=>{
      if(!isMatch)
        return res.json({loginSuccess : false, message : "비밀번호가 틀렸습니다"})


    //3.비밀번호가 같다면 token생성
    
    user.generateToken((err,user)=>{
      //staus(400)은 에러
      if(err) return res.status(400).send(err);


      //token을 저장한다
      //저장은 쿠키, 로컬스토리지 등에 할 수 있다 , 지금은 쿠키에 저장

        res.cookie("x_auth",user.token)
        .status(200)
        .json({loginSuccess: true,userId: user._id})

    })
    })

  })

})


app.get('/api/users/auth',auth,(req,res)=>{
//auth은 endpoint와 cb사이 중간에 실행(middleware)

//미들웨어를 통과해 여기 부분을 실행하고 있다는 것은 Authentication이 True라는 뜻
    res.status(200).json({
      _id: req.user._id,
        isAdmin: req.user.role === 0 ? false: true, // role 0: 일반 유저 로 해놓음
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })

})




//로그아웃
app.get('/api/users/logout',auth,(req,res)=>{

  User.findOneAndUpdate({_id: req.user._id},
    {token : ""},(err,user)=>{
      if(err) return res.json({success:false, err});
      return res.status(200).send({
        success: true
      })
    })

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})