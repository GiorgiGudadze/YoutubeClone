import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useHistory } from 'react-router';
const SearchPage = (props) => {
const history = useHistory();
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
        state: { videoLink: video.video_files[0].link,thumbnailLink:video.video_pictures[0].picture}
    })
    
}

    const renderVideoList = ()=>{
        return props.videoList.data.videos.map(video=>{
            return(
                    <div className="search__wrap" key={video.id} onClick={()=>{selectVideo(video)}}>

                        <div className="search__img">
                            <img src={video.video_pictures[0].picture} alt="searched thumbnails" />
                        </div>

                        <div className="search__details">
                            <p className="search__title">Title of this video is Lorem Ipsum</p>
                            <div className="search__view">7.3M views • 9 months ago</div>
                            <div className="search__channel">
                                <AccountCircleIcon className="search__avatar" />
                                <p>Lorem ipsum</p>
                            </div>
                            <p className="search__desc">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam tempore perspiciatis praesentium dolorum, reiciendis impedit! Saepe adipisci aspernatur vero culpa maiores</p>
                        </div>

                    </div>
            )
        })
    }
    
    return ( 
        <div className="search">
        {renderVideoList()}
        </div>
     );
}
 
export default SearchPage;