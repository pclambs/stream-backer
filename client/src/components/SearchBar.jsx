import { TextField } from "@mui/material"

const SearchBar = ({ search, setSearch, sx }) => {
  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  return (
      <TextField
          type="text"
          placeholder="Search"
          value={search}
          onChange={handleChange}
          variant="standard"
          sx={{ width: '100%', ...sx }}
      />
  )
}

export default SearchBar