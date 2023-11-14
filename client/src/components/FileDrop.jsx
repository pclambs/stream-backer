import React, { useState, useRef } from 'react'
import { Container, Typography } from '@mui/material'


const FileDrop = ({ onFilesAdded }) => {
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef(null)

  const handleDragOver = (event) => {
    event.preventDefault()
    if (!dragOver) setDragOver(true)
  }

  const handleDivClick = (event) => {
    event.preventDefault()
    fileInputRef.current.click()
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
        className='file-drop'
        style={{ 
          border: dragOver ? '2px solid #bd279f' : '2px dashed grey', 
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
        Drag and drop file or click to select file
      </Container>
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFilesSelected}
        style={{ display: 'none' }}
        id="fileInput"
      />
    </div>
  )
}

export default FileDrop