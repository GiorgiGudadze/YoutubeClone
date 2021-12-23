import MenuSharpIcon from '@material-ui/icons/MenuSharp';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import AppsSharpIcon from '@material-ui/icons/AppsSharp';
import NotificationsSharpIcon from '@material-ui/icons/NotificationsSharp';
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import {useRef} from 'react'
import { useLocation } from 'react-router-dom'
import { useEffect} from 'react';
import { useHistory } from "react-router-dom";
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const Header = (props) => {
    const location = useLocation();
    const hamburgerBtn = useRef(null)
    const miniHamburgerBtn = useRef(null)
    let m;
    let history = useHistory();

    useEffect(()=>{
            if(history.location.pathname !== '/currentVideo' && document.body.getBoundingClientRect().width > 768){
                if(document.body.getBoundingClientRect().width <= 1310 ){
                    document.querySelector('.miniSidebar').style="display:block;transition:0s;transform:translateX(0px)";
                    document.querySelector('.sidebar').style="display:block;transition:0s;transform:translateX(-100%)";
                    document.querySelector('.allMarginLeft').style="margin-left:72px;width:calc(100% - 72px);transition:0s";
                    document.querySelector('.preSidebarLogo').style="transition:0s;transform:translateX(-100%)";
                    document.querySelector('.hamburgerCoverCnt').style="z-index:-1;opacity:0";
                    hamburgerBtn.current.classList.add('open')
                    m=1
                }
                else{
                    m=0
                    hamburgerBtn.current.classList.remove('open')
                    document.querySelector('.miniSidebar').style="display:none;transition:0s;transform:translateX(-100%)";
                    document.querySelector('.sidebar').style="display:block;transition:0s;transform:translateX(0)";
                    document.querySelector('.allMarginLeft').style="margin-left:240px;width:calc(100% - 240px);transition:0s";
                    document.querySelector('.preSidebarLogo').style="transition:0s;transform:translateX(-100%)";
                    document.querySelector('.hamburgerCoverCnt').style="z-index:-1;opacity:0";
                }
            }

            else{
                hamburgerBtn.current.classList.add('open')
                document.querySelector('.miniSidebar').style="display:none;transition:0s;transform:translateX(-100%)";
                document.querySelector('.sidebar').style="display:block;transition:0.3s;transform:translateX(-100%)";
                document.querySelector('.preSidebarLogo').style="transition:0s;transform:translateX(-100%)";
                document.querySelector('.hamburgerCoverCnt').style="z-index:-1;opacity:0";
                document.querySelector('.allMarginLeft').style="margin-left:0px;width:unset;transition:0s";
            }

    })


    let counter = 0;
    let j=1;
    let z=0;
    let clickCounter = 0;
    
    window.addEventListener('resize',function(){

        if(history.location.pathname !== '/currentVideo' && document.body.getBoundingClientRect().width > 768){

        if(document.body.getBoundingClientRect().width <= 1310){
            counter+=1;

            if(hamburgerBtn.current.classList.contains('open')){
                document.querySelector('.sidebar').style="display:block;transform:translateX(-100%)";
                document.querySelector('.miniSidebar').style="display:block;transform:translateX(0)";
                document.querySelector('.allMarginLeft').style="margin-left:72px;width:calc(100% - 72px);transition:0.3s";
            }
            else{
                    if(j === 0){
                        document.querySelector('.miniSidebar').style="display:block;transition:0.3s;transform:translateX(-100%)";
                        document.querySelector('.sidebar').style="display:block;transition:0.3s;transform:translateX(0px)";
                        hamburgerBtn.current.classList.remove('open')
                        document.querySelector('.preSidebarLogo').style="transition:0.3s;transform:translateX(0px)";
                        document.querySelector('.hamburgerCoverCnt').style="z-index:10;opacity:0.3";
                    }
                    else if(j === 1){
                        document.querySelector('.sidebar').style="display:block;transform:translateX(-100%)";
                        hamburgerBtn.current.classList.add('open')
                        document.querySelector('.miniSidebar').style="display:block;transition:0.3s;transform:translateX(0px)";
                        document.querySelector('.hamburgerCoverCnt').style="z-index:-1;opacity:0";
                        document.querySelector('.preSidebarLogo').style="transition:0s;transform:translateX(-100%)";
                    }

            }
        }
        else if(document.body.getBoundingClientRect().width > 1310 && counter > 0){
            j=1
            if(clickCounter>0){
                if(hamburgerBtn.current.classList.contains('open')){
                    document.querySelector('.miniSidebar').style.display="block";
                    document.querySelector('.sidebar').style="display:none;transform:translateX(0px)";
                    document.querySelector('.allMarginLeft').style="margin-left:72px;width:calc(100% - 72px)";
                }
                else{
                    document.querySelector('.miniSidebar').style.display="none;";
                    document.querySelector('.sidebar').style="display:block;transform:translateX(0px)";
                    document.querySelector('.allMarginLeft').style="margin-left:240px;width:calc(100% - 240px)";
                    document.querySelector('.hamburgerCoverCnt').style="z-index:-1;opacity:0";
                    document.querySelector('.preSidebarLogo').style="transition:0s;transform:translateX(-100%)";

                }
            }
            else{
                document.querySelector('.miniSidebar').style.display="none";
                document.querySelector('.sidebar').style="display:block;transform:translateX(0px)";
                document.querySelector('.allMarginLeft').style="margin-left:240px;width:calc(100% - 240px)";
                hamburgerBtn.current.classList.remove('open')
            }
            counter=0;
        }
        else{
            if(z===1){
                document.querySelector('.miniSidebar').style.display="none;";
                document.querySelector('.sidebar').style="display:block;transform:translateX(0px)";
                document.querySelector('.allMarginLeft').style="margin-left:240px;width:calc(100% - 240px)";
                document.querySelector('.hamburgerCoverCnt').style="z-index:-1;opacity:0";
                document.querySelector('.preSidebarLogo').style="transition:0s;transform:translateX(-100%)";
                hamburgerBtn.current.classList.remove('open')
            }
        }

        }
        else if(history.location.pathname !== '/currentVideo' && document.body.getBoundingClientRect().width <= 768){
            document.querySelector('.allMarginLeft').style="margin-left:0px;width:unset;transition:0s";

            if(hamburgerBtn.current.classList.contains('open')){
                document.querySelector('.miniSidebar').style="display:none;transition:0s;transform:translateX(-100%)";
            }
            else{
                if(m===0){
                    document.querySelector('.miniSidebar').style="display:block;transition:0.3s;transform:translateX(-100%)";
                    document.querySelector('.sidebar').style="display:block;transition:0.3s;transform:translateX(-100%)";
                    document.querySelector('.preSidebarLogo').style="transition:0.3s;transform:translateX(-100%)";
                    document.querySelector('.hamburgerCoverCnt').style="z-index:-1;opacity:0";
                    hamburgerBtn.current.classList.add('open')
                    z=1;
                }
                else{
                    document.querySelector('.miniSidebar').style="display:block;transition:0.3s;transform:translateX(-100%)";
                    document.querySelector('.sidebar').style="display:block;transition:0.3s;transform:translateX(0px)";
                    document.querySelector('.preSidebarLogo').style="transition:0.3s;transform:translateX(0px)";
                    document.querySelector('.hamburgerCoverCnt').style="z-index:10;opacity:0.3";
                    z=0;
                }

            }
        }

        if(window.innerWidth <=510){
            if(document.querySelector('.header').classList.contains('open')){
                document.querySelector('.searchCnt').style="display:flex;margin-right:0px"
                document.querySelector('.header__item_logo').classList.add('active')
                document.querySelector('.arrowBackIcon').classList.add('active')
                document.querySelector('.MuiSvgIcon-root.smallSearchIcon').classList.add('active')
            }
            else{
                document.querySelector('.MuiSvgIcon-root.smallSearchIcon').classList.remove('active')
                document.querySelector('.searchCnt').style="display:none;margin-right:25px"
                document.querySelector('.arrowBackIcon').classList.remove('active')
                document.querySelector('.header__item_logo').classList.remove('active')
            }
        }
        else{
            document.querySelector('.header').classList.remove('open')
            document.querySelector('.searchCnt').style="display:flex;margin-right:25px"
            document.querySelector('.arrowBackIcon').classList.remove('active')
            document.querySelector('.header__item_logo').classList.remove('active')
            document.querySelector('.MuiSvgIcon-root.smallSearchIcon').classList.add('active')
        }
    })

    const onHamburgerClick = (e) =>{
        clickCounter+=1;
        if(history.location.pathname !== '/currentVideo' && document.body.getBoundingClientRect().width > 768){

        if(document.body.getBoundingClientRect().width <= 1310){

            if(hamburgerBtn.current.classList.contains('open')){
                document.querySelector('.miniSidebar').style="display:block;transition:0.3s;transform:translateX(-100%)";
                document.querySelector('.sidebar').style="display:block;transition:0.3s;transform:translateX(0px)";
                document.querySelector('.allMarginLeft').style="margin-left:72px;width:calc(100% - 72px);transition:0.3s";
                hamburgerBtn.current.classList.remove('open')
                document.querySelector('.preSidebarLogo').style="transition:0.3s;transform:translateX(0px)";
                document.querySelector('.hamburgerCoverCnt').style="z-index:10;opacity:0.3";
                j=0
            }
            else{
                document.querySelector('.miniSidebar').style="display:block;transition:0.3s;transform:translateX(0px)";
                document.querySelector('.sidebar').style="display:block;transition:0.3s;transform:translateX(-100%)";
                document.querySelector('.allMarginLeft').style="margin-left:72px;width:calc(100% - 72px);transition:0.3s";
                hamburgerBtn.current.classList.add('open')
                document.querySelector('.preSidebarLogo').style="transition:0.3s;transform:translateX(-100%)";
                document.querySelector('.hamburgerCoverCnt').style="z-index:-1;opacity:0";
            }
        }

        else{
            if(hamburgerBtn.current.classList.contains('open')){
                document.querySelector('.miniSidebar').style.display="none";
                document.querySelector('.sidebar').style.display="block";
                document.querySelector('.allMarginLeft').style="margin-left:240px;width:calc(100% - 240px)";
                hamburgerBtn.current.classList.remove('open')
            }
            else{
                document.querySelector('.miniSidebar').style="display:block;translateX(0)";
                document.querySelector('.sidebar').style.display="none";
                document.querySelector('.allMarginLeft').style="margin-left:72px;width:calc(100% - 72px)";
                hamburgerBtn.current.classList.add('open')
            }
        }
    }

    else{
        if(hamburgerBtn.current.classList.contains('open')){
            document.querySelector('.miniSidebar').style="display:block;transition:0.3s;transform:translateX(-100%)";
            document.querySelector('.sidebar').style="display:block;transition:0.3s;transform:translateX(0px)";
            hamburgerBtn.current.classList.remove('open')
            document.querySelector('.preSidebarLogo').style="transition:0.3s;transform:translateX(0px)";
            document.querySelector('.hamburgerCoverCnt').style="z-index:10;opacity:0.3";
        }

        else{
            document.querySelector('.sidebar').style="display:block;transition:0.3s;transform:translateX(-100%)";
            hamburgerBtn.current.classList.add('open')
            document.querySelector('.preSidebarLogo').style="transition:0.3s;transform:translateX(-100%)";
            document.querySelector('.hamburgerCoverCnt').style="z-index:-1;opacity:0";
        }
    }

    }

    const showSmallSearch = (e) =>{
        document.querySelector('.searchCnt').style="display:flex;margin-right:0px"
        document.querySelector('.header__item_logo').classList.add('active')
        document.querySelector('.arrowBackIcon').classList.add('active')
        document.querySelector('.MuiSvgIcon-root.smallSearchIcon').classList.add('active')
        document.querySelector('.header').classList.add('open')
    }

    const onArrowBackClick = (e) =>{
        document.querySelector('.arrowBackIcon').classList.remove('active')
        document.querySelector('.MuiSvgIcon-root.smallSearchIcon').classList.remove('active')
        document.querySelector('.searchCnt').style="display:none;margin-right:25px"
        document.querySelector('.searchCnt').classList.add('active')
        document.querySelector('.header__item_logo').classList.remove('active')
        document.querySelector('.header').classList.remove('open')
    }



    return ( 
        <>
        <div className="fixedClear"></div>
        <div className="header">
            <ArrowBackIcon className="arrowBackIcon" onClick={(e)=>onArrowBackClick(e)}/>
            <div className="header__item header__item_logo">
                <MenuSharpIcon ref={hamburgerBtn} className="header__menuIcon" onClick={(e)=>onHamburgerClick(e)} />
                <Link to="/">
                <img src="photos/youtube-logo.png" alt="Youtube Logo" className="header__logo"/>
                </Link>
            </div>

            <div className="header__item searchCnt">
                    <SearchBar getSeacrh={props.getSeacrh}/>
                {/* <div className="header__searchBox"> */}
                {/* </div> */}
            </div>

            <div className="header__rightIcons">
                <VideoCallIcon className="header__icon"/>
                <AppsSharpIcon className="header__icon"/>
                <NotificationsSharpIcon className="header__icon"/>
                <AccountCircleSharpIcon className="header__icon"/>
            </div>
            <SearchIcon className="smallSearchIcon" onClick={(e)=>showSmallSearch(e)}/>
        </div>
        <div className="preSidebarLogo"><MenuSharpIcon ref={miniHamburgerBtn} className="miniMenuIcon" onClick={(e)=>onHamburgerClick(e)}/>
        <img src="photos/youtube-logo.png" alt="Youtube Logo" className="preSidebarLogo__img"/>
        </div>
        </>
     );
}
 
export default Header;