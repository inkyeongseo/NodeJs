const mongoose = require('mongoose');

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

const User = mongoose.model('User',userSchema)

module.exports = {User}