const { User } = require("../../models/User");

let auth =(req, res, next) => {

    //인증처리 수행하는 곳

    //1.클라이언트 쿠키에서 토큰을 가져온다
    
    let token = req.cookies.x_auth;

    //2.토큰을 복호화 한 후 유저를 찾는다

    User.findByToken(token, (err,user)=>{
        if(err) throw err;
        //유저가 없으면 인증되지 않음
        if(!user) return res.json({isAuth:false, err: true})

        //4.유저가 있으면 인증 완료
        req.token = token;
        req.user = user;
        //각 정보를 req하는 이유는 index.js에서 user,token 정보를 가질 수 있다.
        next();
        //작업이 모두 끝나면 다음으로 넘어갈 수 있도록 하기 위해 

    })

}

module.exports = {auth};