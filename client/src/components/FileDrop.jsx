import React, { useState, useRef } from 'react'
import { Container } from '@mui/material'


const FileDrop = ({ onFilesAdded }) => {
  const [dragOver, setDragOver] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [clicked, setClicked] = useState(false)
  const fileInputRef = useRef(null)
  const [thumbnailUrl, setThumbnailUrl] = useState(null);

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
  }

  const handleDragOver = (event) => {
    event.preventDefault()
    if (!dragOver) setDragOver(true)
  }

  const handleDivClick = (event) => {
    event.preventDefault()
    setClicked(!clicked)
    fileInputRef.current.click()
    setTimeout(() => {
      setClicked(false)
    }, 200)
  }

  const handleDragEnter = (event) => {
    event.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (event) => {
    event.preventDefault()
    setDragOver(false)
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setDragOver(false)
    const files = event.dataTransfer.files
    if (files && files.length) {
      onFilesAdded(Array.from(files))
    }
  }

  const handleFilesSelected = (event) => {
    const files = event.target.files
    if (files && files.length) {
      onFilesAdded(Array.from(files))
    }
  }

  return (
    <div >
      <Container
        onClick={handleDivClick}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className='file-drop'
        style={{ 
          border: 
            clicked ? '2px dashed #bd279f' 
            : isHovering ? '2px dashed white' 
            : dragOver ? '2px solid #bd279f' 
            : '2px dashed grey', 
          padding: '20px', 
          cursor: 'pointer', 
          borderRadius: '5px',
          width: '100%',
          height: '100%', 
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {thumbnailUrl ? (
          <img src={thumbnailUrl} alt="Thumbnail" style={{ maxWidth: '100%', maxHeight: '100%' }} />
        ) : (
          "Drag and drop or click to select file"
        )}
      </Container>
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFilesSelected}
        accept="video/.mp4"
        style={{ display: 'none' }}
        id="fileInput"
      />
    </div>
  )
}

export default FileDrop