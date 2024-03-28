import Axios from 'axios'
import config from '../config.js';

export const axios = Axios.create({
    baseURL: config.API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
})
let counter = 1
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
export const sendMessageAction = (message)=>{
    counter++
    return async function (dispatch,getState){
        dispatch({
            type:"NEW-MESSAGE",
            payload:message
        })
    } 
}


export const getMessageAction = (message)=>{
    const count = counter++
    return async function (dispatch,getState){
        const source = new EventSource(config.API_URL+'/api/chat/reply' + `?message=${message}`,
            {withCredentials:true}
        )
        source.addEventListener('message',e=>{
         const data = e.data
        
            dispatch({
                type:"NEW-MESSAGE",
                payload:{
                    text : data,
                    count
                }
            })
        })
        source.addEventListener('close',()=>{
            source.close()
        })

    } 
}