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
    }else{
        next()
        //비밀번호가 아니 다른 것을 바꿀 때 
    }


})


userSchema.methods.comparePassword = function(plainPassword, cb){
    //plainPassword가 진짜 비밀번호,  암호화된 비밀번호와 같은지 확인
    //plainPassword을 암호화해서 db에 있는 것과 같은지 확인해야 함
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err),
            cb(null, isMatch)
            //cb에 에러는 없고 Match가 됨을 뜻함 
    })
}




const User = mongoose.model('User',userSchema)

module.exports = {User}