import React, { useState, useRef } from 'react'
import { Container, Typography } from '@mui/material'
import VideoFileIcon from '@mui/icons-material/VideoFile'


const FileDrop = ({ onFilesAdded }) => {
  const [uploadedFileName, setUploadedFileName] = useState('')
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
      const uploadedFile = files[0]
      onFilesAdded(Array.from(files))
      setUploadedFileName(uploadedFile.name)
    }
  }

  const handleFilesSelected = (event) => {
    const files = event.target.files
    if (files && files.length) {
      const uploadedFile = files[0]
      onFilesAdded(Array.from(files))
      setUploadedFileName(uploadedFile.name)
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
        sx={{ 
          border: 
            (clicked || uploadedFileName) ? '2px dashed #bd279f' 
            : isHovering ? '2px dashed white' 
            : dragOver ? '2px solid #bd279f' 
            : '2px dashed grey', 
          padding: '20px', 
          cursor: 'pointer', 
          borderRadius: '5px',
          height: '100%', 
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          width: '320px',
          flexDirection: 'column',
          margin: 'auto auto',
          justifyContent: 'center',
          
        }}
      >
        <>
          <VideoFileIcon 
            sx={{ 
              width: '4rem', 
              height: '4rem',
              color: isHovering ? 'white' : 'grey', 
              opacity: dragOver ? 0.5 : 1, 
              transition: 'all .2s ease-in-out',
              paddingBottom: '.5rem',
            }}
          />
        </>
        {thumbnailUrl ? (
          <img src={thumbnailUrl} alt="Thumbnail" style={{ maxWidth: '100%', maxHeight: '100%',  }} />
        ) : (
          uploadedFileName ? (
          <p style={{ margin: '0 auto' }}>{uploadedFileName}</p>
          ) : (
            <>
              <Typography
                sx={{
                  display: 'flex',
                  textAlign: 'center',
                  paddingBottom: '.25rem',
                }}
              >
                Drag + Drop
              </Typography>
              <Typography
                sx={{
                  display: 'flex',
                  textAlign: 'center',
                  paddingBottom: '.25rem',
                }}
              >
                or Click
              </Typography>
              <Typography
                sx={{
                  display: 'flex',
                  textAlign: 'center',
                  paddingBottom: '.25rem',
                }}
              >
                to select file
              </Typography>
            </>
          )
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