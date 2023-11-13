import React from "react"
import Chip from "@mui/material/Chip"

const FilterTags = ({ tags, selectedTags, onToggleTag }) => {
  const handleClick = (tag) => {
    onToggleTag(tag)
  }

  const isSelected = (tag) => {
    return selectedTags.includes(tag.id)
  }

  if (!tags) {
    return null
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '.5rem 0',
      gap: '.5rem',
    
    }}>
      {tags.map((tag) => (
        <Chip
          key={tag.id}
          label={tag.name}
          onClick={() => handleClick(tag)}
          color={isSelected(tag) ? 'primary' : 'default'}
        />
      ))}
    </div>
  )
}

export default FilterTags