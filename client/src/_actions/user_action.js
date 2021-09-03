import axios from "axios";
import{
    LOGIN_USER,REGISTER_USER
}from './types';

export function loginUser(dataTosubmit){
    const request = axios.post('/api/users/login',dataTosubmit)
            .then(response => response.data)

    return{
        //위에 있는 변수 request를 reducer에 보내는 작업
        type: LOGIN_USER,
        payload: request
    }
}


export function registerUser(dataTosubmit){
    const request = axios.post('/api/users/register',dataTosubmit)
            .then(response => response.data)

    return{
        //위에 있는 변수 request를 reducer에 보내는 작업
        type: REGISTER_USER,
        payload: request
    }
}