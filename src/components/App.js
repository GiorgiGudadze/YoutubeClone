import Header from "./Header";
import Home from "./Home";
import Sidebar from "./Sidebar";
import {Route,useHistory} from "react-router-dom";
import CurrentVideo from "./CurrentVideo";
import Explore from "./Explore";
import SearchPage from "./SearchPage";
import Youtube from "../api/Youtube";
import { useEffect, useState } from "react";
import Like from "./Like";
import Libary from "./Libary";
import WatchLater from "./WatchLater";
import History from "./History";
import { useRef} from "react";
import Settings from "./Settings";
const App = () => {
    const hamburgerClick = useRef(null)
    const history = useHistory()

    useEffect(()=>{
        hamburgerClick.current.addEventListener('click',()=>{

                if(document.body.getBoundingClientRect().width <= 1310 && history.location.pathname !== '/currentVideo'){
                    if(document.body.getBoundingClientRect().width > 768){
                        document.querySelector('.miniSidebar').style="display:block;transition:0.3s;transform:translateX(0px)";
                        document.querySelector('.sidebar').style="display:block;transition:0.3s;transform:translateX(-100%)";
                        document.querySelector('.allMarginLeft').style="margin-left:72px;width:calc(100% - 72px);transition:0.3s";
                        document.querySelector('.header__menuIcon').classList.add('open')
                        document.querySelector('.preSidebarLogo').style="transition:0.3s;transform:translateX(-100%)";
                        document.querySelector('.hamburgerCoverCnt').style="z-index:-1;opacity:0";
                    }

                    else{
                        document.querySelector('.allMarginLeft').style="margin-left:0px;width:unset;transition:0s";
                        document.querySelector('.miniSidebar').style="display:block;transition:0.3s;transform:translateX(-100%)";
                        document.querySelector('.sidebar').style="display:block;transition:0.3s;transform:translateX(-100%)";
                        document.querySelector('.preSidebarLogo').style="transition:0.3s;transform:translateX(-100%)";
                        document.querySelector('.hamburgerCoverCnt').style="z-index:-1;opacity:0";
                        document.querySelector('.header__menuIcon').classList.add('open')
                    }

                    }

                else{
                    document.querySelector('.sidebar').style="display:block;transition:0.3s;transform:translateX(-100%)";
                    document.querySelector('.header__menuIcon').classList.add('open')
                    document.querySelector('.preSidebarLogo').style="transition:0.3s;transform:translateX(-100%)";
                    document.querySelector('.hamburgerCoverCnt').style="z-index:-1;opacity:0";
                }
        })

    },[history.location.pathname])


    const [videos,setVideos] = useState('')

    const getSeacrh = async (value)=>{

        const res =  await Youtube.get('/search',{params:{
            per_page:2,
            query:value
        }

        })
        
        setVideos(res)
}   

    if(videos){
        history.push('/search')
    }

    return (
        <> 
        
        <Header getSeacrh={getSeacrh}/>

        <Route path="/" exact>
            <div className="sideWrapper">
                <Sidebar/>
                <div className="allMarginLeft">
                    <Home/>
                </div>
            </div>
        </Route>

        <Route path="/currentVideo" render={(props) => <div className="sideWrapper"><Sidebar/><CurrentVideo props={props}/><div className="allMarginLeft"></div></div>}>

        </Route>

        <Route path="/explore">
            <div className="sideWrapper">
                <Sidebar/>
                <div className="allMarginLeft">
                    <Explore/>
                </div>
            </div>
        </Route>

        <Route path="/search" >
            <div className="sideWrapper"> 
                <Sidebar/>
                <div className="allMarginLeft">
                    <SearchPage videoList={videos}/>
                </div>
            </div>
        </Route>

        <Route path="/like">
        <div className="sideWrapper">
            <Sidebar/>
            <div className="allMarginLeft">
                <Like/>
            </div>
        </div>
        </Route>

        <Route path="/library">
        <div className="sideWrapper">
            <Sidebar/>
            <div className="allMarginLeft">
                <Libary/>
            </div>
        </div>
        </Route>

        <Route path="/watchLater">
        <div className="sideWrapper">
            <Sidebar/>
            <div className="allMarginLeft">
                <WatchLater/>
            </div>
        </div>
        </Route>

        <Route path="/history">
        <div className="sideWrapper">
                <Sidebar/>
                <div className="allMarginLeft">
                <History/>
            </div>
        </div>
        </Route>

        <Route path="/settings" exact>
            <div className="sideWrapper">
                <Sidebar/>
                <div className="allMarginLeft">
                    <Settings/>
                </div>
            </div>
        </Route>

        <div ref={hamburgerClick} className="hamburgerCoverCnt"></div>
        </>
     );
     
}
 
export default App;