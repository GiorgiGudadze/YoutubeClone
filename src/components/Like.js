
import DeleteIcon from '@material-ui/icons/Delete';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import useSelect from "../hooks/useSelect";
import { useState } from 'react';

const Like = () => {
    const {selection} = useSelect()
    const [likesArray,setLikesArray] = useState(JSON.parse(localStorage.getItem("likes")))

    const likeList = ()=>{

        if(likesArray && likesArray.length > 0){
            return(
            <div className="sidebarListCnt">
                <div className="libaryFlexTitle"><ThumbUpOutlinedIcon/><span className="libaryTitle">Liked videos</span><span className="collectionLength">{likesArray.length}</span></div>
            {likesArray.map((e,index,obj)=>{
                return(
                <div className="listComponent" key={e.thumbnailLink} onClick={(ev)=>{selection(ev,e)}}>
                    <img src={`${e.thumbnailLink}`} alt="Liked Video" className="listComponent__img"/>
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
                    <div className="libaryFlexTitle"><ThumbUpOutlinedIcon/><span className="libaryTitle">Liked Videos</span><span className="collectionLength">0</span></div>
                    <p className="noListComponent">You Have not Liked Any Video Yet</p>
                </div>
            )  
        }

    }

    const onRemove = (link)=>{

        likesArray.forEach((l,index,obj)=>{

            if(l.thumbnailLink === link){
                obj.splice(index,1)
            }
        })

        localStorage.setItem('likes',JSON.stringify(likesArray))
        let newLike = likesArray;
        setLikesArray([...newLike])

    }
    return ( 
        likeList()
     );
}
 
export default Like;