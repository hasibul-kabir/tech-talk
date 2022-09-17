import React from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';

const Search = () => {
    return (
        <div className='search'>
            <input
                placeholder='Search'
            />
            <div className='searchIcon' >
                <SearchOutlinedIcon />
            </div>
            <div className='threeDot' >
                <MoreVertOutlinedIcon />
            </div>
        </div>
    )
}

export default Search