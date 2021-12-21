import { useState } from 'react';
import VideoList from './VideoList';
import Youtube from '../api/Youtube';
import { useEffect } from 'react';

const Home = () => {

    const [videoArray,setVideoArray] = useState([])

    useEffect(()=>{
        const getVal = async ()=>{

            const res =  await Youtube.get('/popular',{params:{per_page:7}})
            setVideoArray(res.data.videos)
    
    }
        getVal()

    },[])
    const showSkeleton = () =>{
        let skeletonArray = [];
        for(let i=0;i<7;i++){
            skeletonArray.push(
                <div key={i} className="skeleton__box">
                <div className="skeleton__img" alt="img"></div>
                    <div className="skeleton__flex"><div className="skeleton__avatar"></div>
                    <div className="skeleton__details">
                        <p className="skeleton__title"></p>
                        <p className="skeleton__channel"></p>
                        <div className="skeleton__views__date"></div>
                    </div>
                    </div>
                </div>
            )
        }
        return(
            <div className="skeleton">{skeletonArray}</div>
        )

    }


    return ( 
        <div className="homeCnt">
            {videoArray.length === 0 ? showSkeleton(): <VideoList videos={videoArray}/>}
            
        </div>
     );

}
 
export default Home;