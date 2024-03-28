import {useSelector} from 'react-redux/es/hooks/useSelector'
export default function(){
    const chat = useSelector(store=> store.chat)
    return <div className='mb-14'>
        {
            chat?.map((item,index)=>{
                return index%2===1?<div key={index} className="text-right">{item}</div>: <div key={index} dangerouslySetInnerHTML={{__html:item}} className="text-left"/>
            })
        }
    </div>
}