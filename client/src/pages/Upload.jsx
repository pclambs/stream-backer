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

		const fileToUpload = uploaderFiles.length > 0 ? uploadedFiles[0] : null
		console.log('File to upload:', fileToUpload)

		if (!fileToUpload) {
			console.log('No file to upload')
			return
		}

		// TODO: FormData for file upload

		if (videoPostId) {
			await updateVideoPost({ variables: { title, description, tags } })
		} else {
			await addVideoPost({ variables: { title, description, tags } })
		}
		navigate('/profile')
	}
	
	return (
		<Container disableGutters sx={{marginY: 1.2, display: 'flex', gap: '.7rem'}}>

			<Paper sx={{ borderRadius: 0, padding: '.7rem', display: 'flex' }}>
				<FileDrop onFilesAdded={handleFileAdded}/>
			</Paper>

			<Paper sx={{ padding: '.7rem',  borderRadius: 0 }}>
					<form onSubmit={handleFormSubmit}>
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