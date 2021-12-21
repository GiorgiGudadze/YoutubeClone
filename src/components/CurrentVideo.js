import { useRef, useState } from "react";
import { useEffect } from "react";
import Youtube from "../api/Youtube";
import ThumbUpRoundedIcon from '@material-ui/icons/ThumbUpRounded';
import ThumbDownAltRoundedIcon from '@material-ui/icons/ThumbDownAltRounded';
import ReplySharpIcon from '@material-ui/icons/ReplySharp';
import PlaylistAddSharpIcon from '@material-ui/icons/PlaylistAddSharp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
const CurrentVideo = ({props}) => {
    const likeRef = useRef(null)
    const closeRef = useRef(null)
    const dislikeRef = useRef(null)
    const saveRef = useRef(null)
    const modalRef = useRef(null)

    const [relatedVideos,setRelatedVideos] = useState([]);
    const [currentVideo,setCurrentVideo] = useState(props.location.state.videoLink);
    const [currentThumbnail,setCurrentThumbnail] = useState(props.location.state.thumbnailLink);
    const [saveBool,setSaveBool] = useState(false)
    const [open,setOpen] = useState(false)

    const historyArray = JSON.parse(localStorage.getItem("watchHistory"))
    if(!currentVideo || !currentThumbnail){
        setCurrentVideo(historyArray[0].videoLinks)
        setCurrentThumbnail(historyArray[0].thumbnailLink)
    }
    
    useEffect(()=>{
        const getVal = async () =>{

            const res = await Youtube.get('/popular',{params:{per_page:3}})
            setRelatedVideos(res.data.videos)

        } 
        getVal()

    },[])

    useEffect(()=>{
        if(saveBool){
            watchLaterFun()
        }
    },[saveBool])

    const relatedVideosList = () =>{
        return relatedVideos.map((video)=>{

            return(
                <div key={video.id} className="relatedFlex" onClick={()=>selectVideo(video)}>
                    <div className="relatedFlex__img"><img src={video.video_pictures[0].picture} alt="video thumbnail" width="168" /></div>
                    <div className="related">
                        <p className="related__title">Title of this video is Lorem Ipsum</p>
                        <p className="related__channel">Lorem ipsum</p>
                        <div className="related__views__date">7.3M views • 9 months ago</div>
                    </div>
                </div>
            )

            })
    }

    const skeletonList = () =>{
        let skeletonArray = [];
        for(let i=0;i<3;i++){
            skeletonArray.push(
                <div key={i} className="skeletonFlex">
                    <div className="skeletonFlex__img">
                        <div></div>
                    </div>
                    <div className="skeletonRelated">
                        <p className="skeletonRelated__title"></p>
                        <p className="skeletonRelated__channel"></p>
                        <div className="skeletonRelated__views__date"></div>
                    </div>
                </div>
                )
        }
        return skeletonArray;
    }

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

        setCurrentVideo(video.video_files[0].link)
        setCurrentThumbnail(video.video_pictures[0].picture)
    }

    let checkLink = { 'videoLinks': currentVideo, 'thumbnailLink': currentThumbnail};
    let initalLikes = JSON.parse(localStorage.getItem("likes"))
    let initalDislikes = JSON.parse(localStorage.getItem('dislikes'))
    let initalSaves = JSON.parse(localStorage.getItem('watchLater'))

    if(initalLikes){
        let j=0;
        initalLikes.forEach(e=>{
            
            if(e.videoLinks === checkLink['videoLinks']){
                j+=1;

                    if(likeRef.current){
                        likeRef.current.classList.add('active')
                    }
            }

        })
        if(j === 0){

            if(likeRef.current){
                likeRef.current.classList.remove('active')
            }
        }
    }

    if(initalDislikes){
        let j=0;
        initalDislikes.forEach(e=>{
            
            if(e === checkLink['videoLinks']){
                j+=1;
                if(dislikeRef.current){
                    dislikeRef.current.classList.add('active')
                }
            }

        })
        if(j === 0){
            if(dislikeRef.current){
                dislikeRef.current.classList.remove('active')
            }
        }
    }

    if(initalSaves){
        let j=0;
        initalSaves.forEach(s=>{
            if(s.videoLinks === checkLink['videoLinks']){
                j+=1;
                if(saveRef.current){
                    saveRef.current.classList.add('active')
                }
            }

        })

        if(j === 0){
            if(saveRef.current){
                saveRef.current.classList.remove('active')
            }
            
        }

    }

    let modalInterval;
    let modalCntInterval;
    const addModal = (text) => {
        modalCntInterval = setTimeout(()=>{
            let modal = modalRef.current;
            modal.textContent = text;
            modal.style="transform: translateY(0);opacity:1";
            modal.parentElement.style="z-index:13";
            modalInterval = setTimeout(()=>{
                modal.style="transform: translateY(100%);opacity:0;";
                modal.parentElement.style = "z-index:-1"
            },2000)
        },500)

    }



    const onThumbClick = (thumb) =>{
            let modal = modalRef.current;

            if(thumb.currentTarget.classList.contains('active')){

                thumb.currentTarget.classList.remove('active')
                clearInterval(modalInterval);
                clearInterval(modalCntInterval)
                modal.style="transform: translateY(100%);opacity:0;";
                modal.parentElement.style = "z-index:-1"
                let likes = JSON.parse(localStorage.getItem("likes"))
                let dislikes = JSON.parse(localStorage.getItem("dislikes"))
                likes.forEach((e,index,obj)=>{
                    if(e.videoLinks === currentVideo){
                        obj.splice(index,1)
                    }
                })
                localStorage.setItem('likes',JSON.stringify(likes))

                dislikes.forEach((e,index,obj)=>{
                    if(e === currentVideo){
                        obj.splice(index,1)
                    }
                })
                localStorage.setItem('dislikes',JSON.stringify(dislikes))
            }
            else{

                document.querySelectorAll('.iframe__thumb.active').forEach(el=>{
                    el.classList.remove('active')
                })

                thumb.currentTarget.classList.add('active')
                modal.style="transform: translateY(100%);opacity:0";
                modal.parentElement.style = "z-index:-1"

                if(thumb.currentTarget.classList.contains('iframe__like')){
                    clearInterval(modalInterval);
                    clearInterval(modalCntInterval)

                    let allLinks = { 'videoLinks': currentVideo, 'thumbnailLink': currentThumbnail};
                    let likes = JSON.parse(localStorage.getItem("likes"))
                    let dislikes = JSON.parse(localStorage.getItem("dislikes"))

                    if(likes){
                        let k = 0;
                        likes.forEach(e=>{
                            if(e.videoLinks === allLinks['videoLinks']){
                                k++;
                            }
                        })

                        if(k === 0){
                            likes.push(allLinks)
                        }
                        
                    }

                    else{
                        likes = [];
                        likes.push(allLinks)
                    }

                    if(dislikes){
                        dislikes.forEach((e,index,obj)=>{
                            if(e === currentVideo){
                                obj.splice(index,1)
                            }
                        })
                        localStorage.setItem('dislikes',JSON.stringify(dislikes))
                    }


                    localStorage.setItem('likes',JSON.stringify(likes))
                    addModal('Added to Liked Videos')
                }
                else{
                    let likes = JSON.parse(localStorage.getItem("likes"))
                    if(likes){
                        likes.forEach((e,index,obj)=>{
                            if(e.videoLinks === currentVideo){
                                obj.splice(index,1)
                            }
                        })
                        localStorage.setItem('likes',JSON.stringify(likes))
                    }

                    let dislikes = JSON.parse(localStorage.getItem('dislikes'));

                    if(dislikes){
                        dislikes.push(currentVideo)
                    }
                    else{
                        dislikes = [];
                        dislikes.push(currentVideo)
                    }

                    localStorage.setItem('dislikes',JSON.stringify(dislikes))
                    clearInterval(modalInterval);
                    clearInterval(modalCntInterval)
                    addModal('You dislike this video')
                }

            }
        
    }
    const saveBox = ()=>{

        return(
            <div className="currentCover" onClick={(e)=>onOutsideClick(e)}>
                <div className="currentCover__bckg"></div>
                <div className="currentCover__modal">
                    <div className="currentCover__modal_close"><i onClick={()=>{setSaveBool(false)}} ref={closeRef} className="material-icons closeModal">close</i></div>
                    <div className="currentCover__modal_flex">
                    <input type="checkbox" name="watchLater" id="watchLater"/>
                    <label id="watchLaterLabel" htmlFor="watchLater">Watch Later</label>
                    </div>
                </div>
            </div>
        )
        
    }
    
    const onOutsideClick = (e) =>{
        if(e.target.classList.contains('currentCover__bckg')){
            setSaveBool(false)
        }
    }

    const watchLaterFun = ()=>{
        let watchLaterCheckBox = document.querySelector('#watchLater')
        if(watchLaterCheckBox){
            if(saveRef.current.classList.contains('active')){
                watchLaterCheckBox.checked = true;
            }
            else{
                watchLaterCheckBox.checked = false;
            }
            watchLaterCheckBox.addEventListener('change',(e)=>{
                let watchLaterArray = JSON.parse(localStorage.getItem('watchLater'))
                let allLinks = { 'videoLinks': currentVideo, 'thumbnailLink': currentThumbnail};
    
                if(e.target.checked){
                    if(watchLaterArray){
                        watchLaterArray.push(allLinks)
                    }
                    else{
                        watchLaterArray = []
                        watchLaterArray.push(allLinks)
                    }
                    localStorage.setItem('watchLater',JSON.stringify(watchLaterArray))
                    clearInterval(modalInterval);
                    clearInterval(modalCntInterval)
                    addModal('Saved to Watch Later')
                    saveRef.current.classList.add('active')
                }
                else{
                    if(watchLaterArray){
                        watchLaterArray.forEach((e,index,obj)=>{
                            if(e.videoLinks === currentVideo){
                                obj.splice(index,1)
                            }
                        })
                        localStorage.setItem('watchLater',JSON.stringify(watchLaterArray))
                        clearInterval(modalInterval);
                        clearInterval(modalCntInterval)
                        let modal = modalRef.current;
                        modal.style="transform: translateY(100%);opacity:0";
                        modal.parentElement.style = "z-index:-1"
                        saveRef.current.classList.remove('active')
                    }
    
                }
            })
        }
    }



    const onSaveClick = () => {

        setSaveBool(true)

        let watchLaterCheckBox = document.querySelector('#watchLater')
        if(watchLaterCheckBox){
            if(saveRef.current.classList.contains('active')){
                watchLaterCheckBox.checked = true;
            }
            else{
                watchLaterCheckBox.checked = false;
            }
            watchLaterCheckBox.addEventListener('change',(e)=>{
                let watchLaterArray = JSON.parse(localStorage.getItem('watchLater'))
                let allLinks = { 'videoLinks': currentVideo, 'thumbnailLink': currentThumbnail};

                if(e.target.checked){
                    if(watchLaterArray){
                        watchLaterArray.push(allLinks)
                    }
                    else{
                        watchLaterArray = []
                        watchLaterArray.push(allLinks)
                    }
                    localStorage.setItem('watchLater',JSON.stringify(watchLaterArray))
                    clearInterval(modalInterval);
                    clearInterval(modalCntInterval)
                    addModal('Saved to Watch Later')
                    saveRef.current.classList.add('active')
                }
                else{
                    if(watchLaterArray){
                        watchLaterArray.forEach((e,index,obj)=>{
                            if(e.videoLinks === currentVideo){
                                obj.splice(index,1)
                            }
                        })
                        localStorage.setItem('watchLater',JSON.stringify(watchLaterArray))
                        clearInterval(modalInterval);
                        clearInterval(modalCntInterval)
                        let modal = modalRef.current;
                        modal.style="transform: translateY(100%);opacity:0";
                        modal.parentElement.style = "z-index:-1"
                        saveRef.current.classList.remove('active')
                    }

                }
            })
        }

    }


    return ( 
        <>
        {saveBool && saveBox()}
        <div className="currentVideoFlex">

            <div className="iframe">
                <div className="iframe__container">

                    <video controls key={currentVideo}>
                        <source src={currentVideo} type="video/mp4" />
                        <source src={currentVideo} type="video/webm" />
                    </video>
                </div>
                <div className="iframe__flex">
                    <div className="iframe__details">
                        <p className="iframe__title">Title of this video is Lorem Ipsum</p>
                        <p className="iframe__views__date">7.3M views • Jan 31, 2021</p>
                    </div>
                    <div className="iframe__rate__cnt">
                        <div className="iframe__thumb__flex">
                            <div className="iframe__thumbCnt">
                            <ThumbUpRoundedIcon ref={likeRef} className="iframe__thumb iframe__like" onClick={(e)=>{onThumbClick(e)}}/>
                            <span>31K</span>
                            </div>
                            <div className="iframe__thumbCnt">
                            <ThumbDownAltRoundedIcon ref={dislikeRef} style={{marginLeft:'15px'}} className="iframe__thumb iframe__dislike" onClick={(e)=>{onThumbClick(e)}}/>
                            <span>5k</span>
                            </div>

                        </div>
                        <div className="iframe__shareCnt">
                                <ReplySharpIcon className="shareIcon"/>
                                <span>SHARE</span>
                        </div>
                        <div ref={saveRef} className="iframe__save" onClick={()=>{onSaveClick()}}>
                            <PlaylistAddSharpIcon className="saveIcon"/>
                            <span>SAVE</span>
                        </div>
                    </div>
                </div>
                <div className="currentDetails">
                    <div className="currentDetails__avatarCnt">
                        <div>
                        <AccountCircleIcon className="currentDetails__avatar"/>
                        </div>

                        <div>
                            <p className="currentDetails__channel">LoremiPsum</p>
                            <div className="currentDetails__sub">1.7M subscribers</div>
                            <p className="currentDetails__description">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam tempore perspiciatis praesentium dolorum, reiciendis impedit! Saepe adipisci aspernatur vero culpa maiores rem dolor necessitatibus, vitae soluta aliquam reiciendis illum nisi voluptates ad voluptatum natus sit magnam, ipsam, laudantium tempora consectetur maxime! Odit iste, debitis minima ad iure hic libero beatae.</p>
                            {open && <p className="currentDetails__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, rerum necessitatibus ducimus vel quos facilis, dolores doloremque sit voluptatum soluta provident voluptatem molestias! A, amet? Quaerat non vitae pariatur voluptatibus reprehenderit aspernatur natus magnam unde, corporis fuga. Aut autem obcaecati voluptas impedit! Natus, tempore? possimus, officiis hic reprehenderit non quibusdam optio facere ullam iste. Saepe consectetur mollitia molestias quas. Itaque.</p>}
                            <div className="currentDetails__show" onClick={()=>{setOpen(!open)}}>{open ? 'SHOW LESS' : "SHOW MORE"}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relatedCnt">
            {relatedVideos.length === 0 ? skeletonList() : relatedVideosList()}
            </div>

        </div>
        <div className="modalCnt"><div ref={modalRef} className="modal"></div></div>
        </>
     );
}
 
export default CurrentVideo;