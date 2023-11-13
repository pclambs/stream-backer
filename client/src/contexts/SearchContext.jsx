import React, { createContext, useState, useContext } from 'react'

const SearchContext = createContext(null)

export const useSearch = () => useContext(SearchContext)

export const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState('')
  const [selectedTags, setSelectedTags] = useState([])

  const value = {
    search,
    setSearch,
    selectedTags,
    setSelectedTags,
  }

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  )
}