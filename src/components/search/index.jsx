import React from 'react'

const Search = ({search,setSearch,handleSeach}) => {
  return (
    <div className='serch-engin'>
        <input 
        type="text" 
        className='city-search'
        name='search'
        value={search}
        onChange={(e)=> setSearch(e.target.value)}/>
        <button className='serch-button' onClick={handleSeach}>Search</button>
    </div>
  )
}

export default Search