import HistoryOutlinedIcon from '@material-ui/icons/HistoryOutlined';
import useSelect from "../hooks/useSelect";
const History = () => {
    const historyArray = JSON.parse(localStorage.getItem("watchHistory"))
    const {selection} = useSelect()
    const historyVideos = ()=>{
        
        if(historyArray){
            return(
                <div className='sidebarListCnt'>
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
            <div className='sidebarListCnt'> 
                <div className="libaryFlexTitle"><HistoryOutlinedIcon/><span className="libaryTitle">History</span><span className="collectionLength">0</span></div>
                <p className="noListComponent">You Have Not Watched Any Video</p>
            </div>
            )
        }

    }
        
    return ( 
        historyVideos()
     );
}
 
export default History;