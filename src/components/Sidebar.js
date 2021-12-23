import HomeIcon from '@material-ui/icons/Home';
import ExploreSharpIcon from '@material-ui/icons/ExploreSharp';
import VideoLibrarySharpIcon from '@material-ui/icons/VideoLibrarySharp';
import HistoryRoundedIcon from '@material-ui/icons/HistoryRounded';
import WatchLaterSharpIcon from '@material-ui/icons/WatchLaterSharp';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import SettingsIcon from '@material-ui/icons/Settings';
import {NavLink} from "react-router-dom";

const Sidebar = () => {

    return ( 
        <>

        <div className="sidebar">
            <NavLink exact className="sidebar_Atag" to="/" activeClassName="sidebarBoxActive">
            <div className="sidebar__box">
                <HomeIcon className="sidebar__icon"/>
                <span className="sidebar__title">Home</span>
            </div>
            </NavLink>

            <NavLink to="/explore" activeClassName="sidebarBoxActive" className="sidebar_Atag">
            <div className="sidebar__box">
                <ExploreSharpIcon className="sidebar__icon"/>
                <span className="sidebar__title">Explore</span>
            </div>
            </NavLink>

            <div className="boxWrapper">
            <NavLink to="/library" className="sidebar_Atag" activeClassName="sidebarBoxActive">
                <div className="sidebar__box">
                    <VideoLibrarySharpIcon className="sidebar__icon"/>
                    <span className="sidebar__title">Library</span>
                </div>
            </NavLink>

            <NavLink to="/history" className="sidebar_Atag" activeClassName="sidebarBoxActive">
                <div className="sidebar__box">
                    <HistoryRoundedIcon className="sidebar__icon"/>
                    <span className="sidebar__title">History</span>
                </div>
            </NavLink>

            <NavLink to="/watchLater" className="sidebar_Atag" activeClassName="sidebarBoxActive">
                <div className="sidebar__box">
                    <WatchLaterSharpIcon className="sidebar__icon"/>
                    <span className="sidebar__title">Watch later</span>
                </div>
            </NavLink>

            <NavLink to="/like" className="sidebar_Atag" activeClassName="sidebarBoxActive">
                <div className="sidebar__box">
                    <ThumbUpIcon className="sidebar__icon"/>
                    <span className="sidebar__title">Liked videos</span>
                </div>
            </NavLink>

            </div>

            <div className="boxWrapper">

                <NavLink to="/settings" className="sidebar_Atag" activeClassName="sidebarBoxActive">
                    <div className="sidebar__box">
                        <SettingsIcon className="sidebar__icon"/>
                        <span className="sidebar__title">Settings</span>
                    </div>
                </NavLink>

            </div>

            <div className="boxWrapper">

                <div className="sidebar__infoBox">
                    <span className="sidebar__info">About</span>
                    <span className="sidebar__info">Press</span>
                    <span className="sidebar__info">Contact us</span>
                    <span className="sidebar__info">Creators</span>
                    <span className="sidebar__info">Advertise</span>
                    <span className="sidebar__info">Developers</span>
                </div>

                <div className="sidebar__infoBox">
                    <span className="sidebar__info">Terms</span>
                    <span className="sidebar__info">Privacy</span>
                    <span className="sidebar__info">Policy & Safety us</span>
                    <span className="sidebar__info">How YouTube works</span>
                    <span className="sidebar__info">Test new features</span>
                </div>
                
                <div className="copyrightLabel">&#169; 2021 Google LLC</div>

            </div>
        </div>

        <div className="miniSidebar">
            <NavLink exact className="sidebar_Atag" to="/" activeClassName="miniSidebarBoxActive">
                <div className="miniSidebar__box">
                    <HomeIcon className="miniSidebar__icon"/>
                    <span className="miniSidebar__title">Home</span>
                </div>
            </NavLink>

            <NavLink exact className="sidebar_Atag" to="/explore" activeClassName="miniSidebarBoxActive">
                <div className="miniSidebar__box">
                    <ExploreSharpIcon className="miniSidebar__icon"/>
                    <span className="miniSidebar__title">Explore</span>
                </div>
            </NavLink>

            <NavLink exact className="sidebar_Atag" to="/like" activeClassName="miniSidebarBoxActive">
                <div className="miniSidebar__box">
                    <ThumbUpIcon className="miniSidebar__icon"/>
                    <span className="miniSidebar__title">Like</span>
                </div>
            </NavLink>

            <NavLink exact className="sidebar_Atag" to="/library" activeClassName="miniSidebarBoxActive">
                <div className="miniSidebar__box">
                    <VideoLibrarySharpIcon className="miniSidebar__icon"/>
                    <span className="miniSidebar__title">Library</span>
                </div>
            </NavLink>

        </div>
        
        </>
     );
}
 
export default Sidebar;