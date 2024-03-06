import {useSelector} from 'react-redux/es/hooks/useSelector'
export default function({location}){
    const chat = useSelector(store=> store.chat)
    const pipe = useSelector(store=> store.pipe)
    return <>
        {
           location==='/'? chat?.map((item,index)=>{
                return <div key={index}>{item}</div>
            }): pipe?.map((item,index)=>{
                return <div key={index}>{item}</div>
            })
        }
    </>
}