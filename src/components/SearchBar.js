import SearchIcon from '@material-ui/icons/Search';
import { useState } from 'react';

const SearchBar = (props) => {

    const [searchVal,setSearchVal] = useState('')

    return ( 
        <>
        <input type="text" placeholder="Search" className="header__searchInput" onKeyDown={(e)=>{if(e.key === 'Enter') {props.getSeacrh(searchVal)}}} onChange={(e)=>{setSearchVal(e.target.value)}}/>
        <SearchIcon className="searchIcon" onClick={()=>{props.getSeacrh(searchVal)}}/>
        </>
     );
}
 
export default SearchBar;