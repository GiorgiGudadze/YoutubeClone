import DeleteIcon from '@material-ui/icons/Delete';
import { useState } from 'react';
import WatchLaterOutlinedIcon from '@material-ui/icons/WatchLaterOutlined';
import useSelect from "../hooks/useSelect";
const WatchLater = () => {
    const {selection} = useSelect()
    const [watchLaterArray,setWatchLaterArray] = useState(JSON.parse(localStorage.getItem("watchLater")))

    const WatchLaterList = ()=>{

        if(watchLaterArray && watchLaterArray.length > 0){
            return(
            <div className="sidebarListCnt">
                <div className="libaryFlexTitle"><WatchLaterOutlinedIcon/><span className="libaryTitle">Watch Later</span><span className="collectionLength">{watchLaterArray.length}</span></div>
            {watchLaterArray.map((e,index,obj)=>{
                return(
                <div className="listComponent" key={e.thumbnailLink} onClick={(ev)=>{selection(ev,e)}}>
                    <img src={`${e.thumbnailLink}`} alt="WatchLater Video" className="listComponent__img"/>
                    <div className="listComponent__details">
                        <p className="listComponent__title">Title of this video is Lorem Ipsum</p>
                        <p className="listComponent__channel">LoremiPsum</p>
                    </div>
                    <DeleteIcon className="listComponent__delete" onClick={()=>{onRemove(e.thumbnailLink)}}/>
                </div>
                )
                
            })}
            </div>
            )
        }

        else{
            return(
                <div className="sidebarListCnt">
                    <div className="libaryFlexTitle"><WatchLaterOutlinedIcon/><span className="libaryTitle">Watch Later</span><span className="collectionLength">0</span></div>
                    <p className="noListComponent">You Have not Added Any Video in Watch Later's List</p>
                </div>
            )  
        }
    }

    const onRemove = (link)=>{

        watchLaterArray.forEach((l,index,obj)=>{

            if(l.thumbnailLink === link){
                obj.splice(index,1)
            }
        })

        localStorage.setItem('watchLater',JSON.stringify(watchLaterArray))
        let newWatchLater = watchLaterArray;
        setWatchLaterArray([...newWatchLater])

    }
    return ( 
        WatchLaterList()
     );
}
 
export default WatchLater;