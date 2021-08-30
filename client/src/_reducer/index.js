import { combineReducers } from "redux";
//combineReudcers는 여러가지 reducer들을 RootReducer에서 하나로 합쳐주는 기능
import user from './user_reducer';

const rootReducer =  combineReducers({
    user
})

export default rootReducer;