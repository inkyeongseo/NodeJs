import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';

export default function (SpecificComponent, option, adminRoute = null){
    // option 값의 종류
    // null: 아무나 출입이 가능한 페이지
    // true: 로그인한 유저만 출입이 가능한 페이지
    // false: 로그인한 유저는 출입 불가능한 페이지

    function AuthenticationCheck(props){

        const dispatch = useDispatch();
        
        useEffect(() => {
            dispatch(auth()).then(response => {    
                // console.log(response)

                if(!response.payload.isAuth){
                    //로그인 하지 않은 상태
                    if(option){
                        //여기 조건문은 option == true를 나타낸 것임
                        props.history.push('/login')
                    }

                }else{
                    //로그인한 상태
                    if(adminRoute && !response.payload.isAdmin){
                        //admin인 아닌데 admin페이지에 들어가려고 하는 경우
                        props.history.push('/')
                    }else{
                        if(option === false)   //로그인 한 사람이 로그인 페이지나 회원가입 페이지에 들어가려고 하는 경우
                        props.history.push('/')
                    }
                }
            })

        }, [])
        return (
            <SpecificComponent/>
        )
    }
    return AuthenticationCheck
}