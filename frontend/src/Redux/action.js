import Axios from 'axios'
import config from '../config.js';

export const axios = Axios.create({
    baseURL: config.API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
})

// axios.interceptors.request.use(function (config1) {

//     // Do something before request is sent
//     const {GET_COOKIE} = config
//     const token = GET_COOKIE('auth-token')
//     if (token) {
//         config1.headers.Authorization = `Bearer ${token}`
//     }

//     return config1;
//   }, function (error) {

//     // Do something with request error
//     // return Promise.reject(error);
// });

export const connectAIBot = async ()=>{
    await axios.post('/api/chat/connect')
}
export const sendMessageAction = (message)=>{
    return async function (dispatch,getState){
        dispatch({
            type:"NEW-MESSAGE",
            payload:message
        })
    } 
}

export const getMessageAction = (message)=>{
    return async function (dispatch,getState){
        const data = await axios.post('/api/chat/reply',{
            message
        },{withCredentials:true})
        console.log(data?.data)
        dispatch({
            type:"NEW-MESSAGE",
            payload:data?.data?.data?.text
        })
    } 
}