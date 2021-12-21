import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useHistory } from "react-router-dom";
const VideoList = ({videos}) => {

    let history = useHistory();
    const selectVideo = (video) =>{

        let allLinks = { 'videoLinks': video.video_files[0].link, 'thumbnailLink': video.video_pictures[0].picture};
        let watchHistory = JSON.parse(localStorage.getItem("watchHistory"))

        if(watchHistory){
            let k = 0;
            watchHistory.forEach((e,index,obj)=>{
                if(e.videoLinks === allLinks['videoLinks']){
                    k++;
                    obj.splice(index,1)
                    obj.unshift(allLinks)
                }
            })

            if(k === 0){
                watchHistory.unshift(allLinks)
            }
            
        }

        else{
            watchHistory = [];
            watchHistory.push(allLinks)
        }

        localStorage.setItem('watchHistory',JSON.stringify(watchHistory))

        history.push({
            pathname: '/currentVideo',
            state: { videoLink: video.video_files[0].link,
                     thumbnailLink: video.video_pictures[0].picture
            }
        })

    }

    return ( 
        <div className="content">
            {videos.map(video=>
                <div className="content__box" key={video.id} onClick={()=>{selectVideo(video)}}>
                    <img className="content__img" src={`${video.video_pictures[0].picture}`} alt="img"/>
                    <div className="content__flex">
                    <AccountCircleIcon className="content__avatar" />
                    <div className="content__details">
                        <p className="content__title">Title of this video is Lorem Ipsum</p>
                        <p className="content__channel">Lorem ipsum</p>
                        <div className="content__views__date">7.3M views • 9 months ago</div>
                    </div>
                    </div>
                </div>
            )}
        </div>
     );
}
 
export default VideoList;