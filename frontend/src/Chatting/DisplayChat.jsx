import {useSelector} from 'react-redux/es/hooks/useSelector'
export default function(){
    const chat = useSelector(store=> store.pipe)
    return <>
        {
            chat?.map((item,index)=>{
                return <div key={index}>{item}</div>
            })
        }
    </>
}