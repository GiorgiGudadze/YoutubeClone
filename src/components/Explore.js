import WhatshotIcon from '@material-ui/icons/Whatshot';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import SportsBaseballIcon from '@material-ui/icons/SportsBaseball';
import { useHistory } from 'react-router';
import Youtube from "../api/Youtube";
import { useState } from 'react';
import { useEffect } from "react";

const Explore = (props) => {
    const history = useHistory();
    const [videoCollection,setVideoCollection] = useState([])
    const [isActive, setActive] = useState("");
    const [title,setTitle] = useState('Trending videos')
    const getSeacrh = async (value)=>{

        const res =  await Youtube.get('/search',{params:{
            per_page:2,
            query:value
        }

        })
        
        setVideoCollection(res.data.videos)
}   

    useEffect(()=>{
        const getVal = async () =>{

            const res = await Youtube.get('/popular',{params:{per_page:3}})
            setVideoCollection(res.data.videos)

        } 
        getVal()

    },[])


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

    const renderVideoList = () =>{
        return (
            <>
            {videoCollection.map(video=>{
            return(
                    <div className="exploreVideo__wrap" key={video.id} onClick={()=>{selectVideo(video)}}>

                        <div className="exploreVideo__img">
                            <img src={video.video_pictures[0].picture} alt="searched thumbnails" />
                        </div>

                        <div className="exploreVideo__details">
                            <p className="exploreVideo__title">Title of this video is Lorem Ipsum</p>
                            <div className="exploreVideo__view">7.3M views • 9 months ago</div>
                            <div className="exploreVideo__channel">
                                <p>Lorem ipsum</p>
                            </div>
                            <p className="exploreVideo__desc">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam tempore perspiciatis praesentium dolorum, reiciendis impedit! Saepe adipisci aspernatur vero culpa maiores</p>
                        </div>

                    </div>
                    )
            })
            }
            </>)

    }

    return ( 
        <div className="exploreCnt">
            <div className="exploreTabs">

                <div className={`exploreTabs__box ${isActive === 'trending' ? 'exploreTabs__box_active':''}`} onClick={()=>{
                    setTitle('Trending videos')
                    getSeacrh('famous')
                    setActive('trending')
                }}>
                <WhatshotIcon className="exploreTabs__img exploreTabs__img_fire"/>
                <p className="exploreTabs__title">Trending</p>
                </div>

                <div className={`exploreTabs__box ${isActive === 'music' ? 'exploreTabs__box_active':''}`} onClick={()=>{
                    setTitle('Music')
                    getSeacrh('Music')
                    setActive('music')    
                }}>
                <MusicNoteIcon className="exploreTabs__img exploreTabs__img_note"/>
                <p className="exploreTabs__title">Music</p>
                </div>

                <div className={`exploreTabs__box ${isActive === 'gaming' ? 'exploreTabs__box_active':''}`} onClick={()=>{
                    setTitle('Gaming')
                    getSeacrh('Game')
                    setActive('gaming') 
                }}>
                <SportsEsportsIcon className="exploreTabs__img exploreTabs__img_gaming"/>
                <p className="exploreTabs__title">Gaming</p>
                </div>

                <div className={`exploreTabs__box ${isActive === 'sport' ? 'exploreTabs__box_active':''}`} onClick={()=>{
                    setTitle('Sports')
                    getSeacrh('sport')
                    setActive('sport')     
                }}>
                <SportsBaseballIcon className="exploreTabs__img exploreTabs__img_sports"/>
                <p className="exploreTabs__title">Sports</p>
                </div>
            </div>
            <div className="exploreVideo">
                <p className="exploreVideo__header">{title}</p>
                {renderVideoList()}
            </div>
        </div>
     );
}
 
export default Explore;