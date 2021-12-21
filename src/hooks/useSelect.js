import { useHistory } from "react-router-dom";

const useSelect = () => {
    let history = useHistory();

    const selection = (e,video) =>{

    if(e.target.tagName !=='svg' && e.target.tagName !== 'path'){
    let allLinks = { 'videoLinks': video.videoLinks, 'thumbnailLink': video.thumbnailLink};
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
        state: { videoLink: video.videoLinks,thumbnailLink:video.thumbnailLink}
    })
    }
}
return {selection}

}
 
export default useSelect;