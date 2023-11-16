import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import CustomTextField from '../components/CustomTextField'
import FileDrop from '../components/FileDrop'
import { ADD_VIDEO_POST, UPDATE_VIDEO_POST } from '../utils/mutations'
import Auth from "../utils/auth"
import { Button, Typography, Container, Paper } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'


const Upload = () => {
	const [formState, setFormState] = useState({ title: '', description: '', tags: '', })
	const [uploadedFiles, setUploadedFiles] = useState([])
	const [addVideoPost] = useMutation(ADD_VIDEO_POST)
	const [updateVideoPost] = useMutation(UPDATE_VIDEO_POST)

	const { videoPostId } = useParams()
	const navigate = useNavigate()

	useEffect(() => { {
		if (!Auth.loggedIn()) {
			navigate('/login')
		} else if (videoPostId) {
			const videoPost = videoPosts.find((videoPost) => videoPost._id === videoPostId)
			setFormState({
				title: videoPost.title,
				description: videoPost.description,
				tags: videoPost.tags,
			})
		}
	}}), [navigate, videoPostId]

	const handleFileAdded = (files) => {
		console.log('Files added:', files)
		setUploadedFiles(files)
	}

	const handleFileUpload = async (file) => {
		const formData = new FormData()
		formData.append('file', file)
		formData.append('upload_preset', 'x2ldozq4')
	
		try {
			const response = await fetch(`https://api.cloudinary.com/v1_1/streamback/video/upload`, {
				method: 'POST',
				body: formData,
			})
	
			if (!response.ok) throw new Error('Upload failed')
	
			const data = await response.json()
			return data.secure_url; // The URL of the uploaded video
		} catch (error) {
			console.error('Error uploading file:', error)
			// Handle errors as appropriate
		}
	}

	const handleChange = (event) => {
		const { name, value } = event.target
	
		setFormState({
			...formState,
			[name]: value,
		})
	}

	const handleFormSubmit = async (event) => {
		event.preventDefault()
		const { title, description, tags } = formState

		const userId = Auth.getProfile()?.data?._id
	
		// check if theres a file to upload
		const fileToUpload = uploadedFiles.length > 0 ? uploadedFiles[0] : null
	
		if (!fileToUpload) {
			console.log('No file to upload')
			return
		}
	
		// upload file to Cloudinary and get URL
		const uploadedVideoUrl = await handleFileUpload(fileToUpload)

		if (!uploadedVideoUrl) {
			console.log('Failed to upload video')
			return
		}
	
		// TODO: generate and upload a thumbnail, then get the URL
		const uploadedThumbnailUrl = '../assets/stream-backer-play-logo.png'
	
		// use Cloudinary URLs in GraphQL mutation
		const response = await addVideoPost({ 
			variables: { 
				title, 
				description,
				thumbnail: uploadedThumbnailUrl,
				postedBy: userId,
				videoSrc: uploadedVideoUrl,
				// tags 
			}
		})
	
		if (response && response.data) {
			console.log('Video post created:', response.data.addVideoPost)
			navigate(`/profile/${userId}`)
		} else {
			console.error('Error creating video post')
		}
	}
	
	return (
		<Container disableGutters sx={{ marginY: 1.2, display: 'flex', gap: '.7rem', justifyContent: 'center' }}>

			<Paper sx={{ borderRadius: 0, padding: '.7rem', display: 'flex' }}>
				<FileDrop onFilesAdded={handleFileAdded}/>
			</Paper>
			
			<Paper>
				<Typography variant='h6' sx={{ borderRadius: 0, padding: '.7rem', display: 'flex' }}>Thumbnail Stuffs</Typography>
				{/* <img style={{padding: '.7rem', objectFit: 'fill', height: 'auto', width: '100%'}} src="https://tcproduction.blob.core.windows.net/media/%7B240f8b72-1159-4fd3-a150-0a837f50ba4a%7D.2573758641_297d6d19fa_o.jpg" alt="Video Thumbnail" className="cardThumbnail" /> */}
			</Paper>

			<Paper sx={{ padding: '.7rem',  borderRadius: 0 }}>
					<form onSubmit={handleFormSubmit} encType="multipart/form-data">
						<CustomTextField
							name="title"
							type="text"
							value={formState.title}
							onChange={handleChange}
							variant='standard'
							label='Title (required)'
						/>
						<CustomTextField
							name="description"
							type="text"
							value={formState.description}
							onChange={handleChange}
							variant='standard'
							rows={4}
							multiline
							label='Description'
						/>
						<CustomTextField
							name="tags"
							type="text"
							value={formState.tags}
							onChange={handleChange}
							variant='standard'
							label='Tags'
						/>
						<Button 
							variant="contained" 
							color="primary" 
							type="submit" 
							size='large'
							sx={{
								width: '100%',
								marginTop: '1rem'
							}}
							startIcon={<CloudUploadIcon />}
						>
							Upload
						</Button>
					</form>
				</Paper>

		</Container>
	)
}

export default Upload