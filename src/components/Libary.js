import WatchLaterOutlinedIcon from '@material-ui/icons/WatchLaterOutlined';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import HistoryOutlinedIcon from '@material-ui/icons/HistoryOutlined';
import useSelect from "../hooks/useSelect";
const Libary = () => {

    const {selection} = useSelect()
    const historyArray = JSON.parse(localStorage.getItem("watchHistory"))
    const watchLaterArray = JSON.parse(localStorage.getItem('watchLater'))
    const likesArray = JSON.parse(localStorage.getItem("likes"))
    const watchLaterList = ()=>{
        
        if(watchLaterArray){
            return(
                <div>
                    <div className="libaryFlexTitle"><WatchLaterOutlinedIcon/><span className="libaryTitle">Watch later</span><span className="collectionLength">{watchLaterArray.length}</span></div>
                    <div className="content content__disableMargin">
                    {watchLaterArray.map(video=>
                        <div className="content__box_library" key={video.thumbnailLink} onClick={(e)=>{selection(e,video)}}>
                            <img className="content__img_library" src={`${video.thumbnailLink}`} alt="img"/>
                            <div className="content__flex">
                            <div className="content__details">
                                <p className="content__title">Title of this video is Lorem Ipsum</p>
                                <p className="content__channel">Lorem ipsum</p>
                                <div className="content__views__date">7.3M views • 9 months ago</div>
                            </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            )
        }

        else{
            return(
            <div> 
                <div className="libaryFlexTitle"><WatchLaterOutlinedIcon/><span className="libaryTitle">Watch later</span><span className="collectionLength">0</span></div>
                <p className="noLibrary">You Have not Added Any Video in Watch Later List</p>
            </div>
            )
        }

    }

    const likedVideos = ()=>{
        
        if(likesArray){
            return(
                <div>
                    <div className="libaryFlexTitle"><ThumbUpOutlinedIcon/><span className="libaryTitle">Liked videos
</span><span className="collectionLength">{likesArray.length}</span></div>
                    <div className="content content__disableMargin">
                    {likesArray.map(video=>
                        <div className="content__box_library" key={video.thumbnailLink} onClick={(e)=>{selection(e,video)}}>
                            <img className="content__img_library" src={`${video.thumbnailLink}`} alt="img"/>
                            <div className="content__flex">
                            <div className="content__details">
                                <p className="content__title">Title of this video is Lorem Ipsum</p>
                                <p className="content__channel">Lorem ipsum</p>
                                <div className="content__views__date">7.3M views • 9 months ago</div>
                            </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            )
        }

        else{
            return(
            <div> 
                <div className="libaryFlexTitle"><WatchLaterOutlinedIcon/><span className="libaryTitle">Watch later</span><span className="collectionLength">0</span></div>
                <p className="noLibrary">You Have not Liked Any Video Yet</p>
            </div>
            )
        }

    }

    const historyVideos = ()=>{
        
        if(historyArray){
            return(
                <div>
                    <div className="libaryFlexTitle"><HistoryOutlinedIcon/><span className="libaryTitle">History</span><span className="collectionLength">{historyArray.length}</span></div>
                    <div className="content content__disableMargin">
                    {historyArray.map(video=>
                        <div className="content__box_library" key={video.thumbnailLink} onClick={(e)=>{selection(e,video)}}>
                            <img className="content__img_library" src={`${video.thumbnailLink}`} alt="img"/>
                            <div className="content__flex">
                            <div className="content__details">
                                <p className="content__title">Title of this video is Lorem Ipsum</p>
                                <p className="content__channel">Lorem ipsum</p>
                                <div className="content__views__date">7.3M views • 9 months ago</div>
                            </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            )
        }

        else{
            return(
            <div> 
                <div className="libaryFlexTitle"><HistoryOutlinedIcon/><span className="libaryTitle">History</span><span className="collectionLength">0</span></div>
                <p className="noLibrary">You Have Not Watched any Video</p>
            </div>
            )
        }

    }

    return ( 
    <div className="libaryCnt">
        {watchLaterList()}
        {likedVideos()}
        {historyVideos()}
    </div>        
    );
}
 
export default Libary;