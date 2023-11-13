import { TextField } from "@mui/material"

const SearchBar = ({ search, setSearch }) => {
  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  return (
    <div className="search-bar">
      <TextField
          type="text"
          placeholder="Search"
          value={search}
          onChange={handleChange}
          variant="standard"      
      />
    </div>
  )
}

export default SearchBar