const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds =10;


const userSchema = mongoose.Schema({
    name:{
        type: String,
         maxlength: 50
    },
    email:{
        type: String,
        trim: true,
        unique: 1
    },
    password:{
        type: String,
        minlength: 5
    },
    lasname:{
        type: String,
        maxlength : 50
    },
    role:{
        type: Number,
        default: 0  // 1:관리자 0은 일반 사용자
    },
    image: String,
    token:{
        type: String
    },
    tokenExp:{
        type:Number  //위에 토큰 유효기간
    }
})

//trim은 빈칸을 제거해주는 역할

userSchema.pre('save',function(next){
    //비밀번호를 암호화 시키는 과정

    var user = this;

    //비밀번호가 수정되었을 때만 이 과정을 수행
    if(user.isModified('password')){
        //salt생성
        bcrypt.genSalt(saltRounds, function(err,salt){
            if(err) return next(err)

            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err)
                user.password = hash
                next()
            })
        })
    }


})


const User = mongoose.model('User',userSchema)

module.exports = {User}