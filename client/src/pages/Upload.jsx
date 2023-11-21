import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import CustomTextField from '../components/CustomTextField'
import FileDrop from '../components/FileDrop'
import { ADD_VIDEO_POST, UPDATE_VIDEO_POST } from '../utils/mutations'
import { QUERY_SINGLE_PROFILE, QUERY_VIDEOPOSTS } from '../utils/queries'
import Auth from "../utils/auth"
import { Button, Typography, Container, Paper, CircularProgress } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import LoadingButton from '@mui/lab/LoadingButton'

const Upload = () => {
	const [formState, setFormState] = useState({ title: '', description: '', tags: '', })
	const [uploadedFiles, setUploadedFiles] = useState([])
	const [addVideoPost] = useMutation(ADD_VIDEO_POST)
	const [updateVideoPost] = useMutation(UPDATE_VIDEO_POST)
	const [uploading, setUploading] = useState(false)
	const [validTitle, setValidTitle] = useState(false)

	const { videoPostId } = useParams()
	const navigate = useNavigate()

	useEffect(() => {
		{
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
		}
	}), [navigate, videoPostId]

	const handleFileAdded = (files) => {
		console.log('Files added:', files)
		setUploadedFiles(files)
	}

	const handleFileUpload = async (file) => {
		const formData = new FormData()
		formData.append('file', file)
		formData.append('upload_preset', 'x2ldozq4')

		try {
			setUploading(true)
	
			// Upload video to Cloudinary
			const response = await fetch(`https://api.cloudinary.com/v1_1/streamback/video/upload`, {
				method: 'POST',
				body: formData,
			})
	
			if (!response.ok) throw new Error('Video upload failed')
	
			const data = await response.json()
			const videoUrl = data.secure_url
			const thumbnailUrl = `${videoUrl.slice(0, -4)}.jpg`	
	
			return { videoUrl, thumbnailUrl }
		} catch (error) {

			// TODO: snackbar error message
			console.error('Error uploading file:', error)
		} finally {
			setUploading(false)
		}
	}

	const handleChange = (event) => {
		const { name, value } = event.target

		setFormState({
			...formState,
			[name]: value,
		})
		setValidTitle(value.trim() !== '')
	}

	const handleFormSubmit = async (event) => {
		event.preventDefault()
		const { title, description, tags } = formState

		const userId = Auth.getProfile()?.data?._id

		// check if theres a file to upload
		const fileToUpload = uploadedFiles.length > 0 ? uploadedFiles[0] : null

		if (!fileToUpload) {
			// TODO: snackbar error message
			console.log('No file to upload')
			setUploading(false)
			return
		}

		// upload file to Cloudinary and get URL
		const { videoUrl, thumbnailUrl } = await handleFileUpload(fileToUpload)

		if (!videoUrl) {
			// TODO: snackbar error message
			console.log('Failed to upload video')
			setUploading(false)
			return
		}

		// use Cloudinary URLs in GraphQL mutation
		const response = await addVideoPost({
			variables: {
				title,
				description,
				thumbnail: thumbnailUrl,
				postedBy: userId,
				videoSrc: videoUrl,
				// tags 
			},
			refetchQueries: [
      { query: QUERY_VIDEOPOSTS },
      { query: QUERY_SINGLE_PROFILE, variables: { userId } },
			],
		})

		if (response && response.data) {
			console.log('Video post created:', response.data.addVideoPost)
			navigate(`/profile/${userId}`)
		} else {
			console.error('Error creating video post')
		}
		setUploading(false)
	}

	return (
		<Container disableGutters sx={{ marginY: 1.2, display: 'flex', gap: '.7rem', justifyContent: 'center' }}>

			<Paper sx={{ borderRadius: 0, padding: '.7rem', display: 'flex' }}>
				<FileDrop onFilesAdded={handleFileAdded} />
			</Paper>
			<Paper sx={{ padding: '.7rem', borderRadius: 0 }}>
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
					<LoadingButton
						variant="contained"
						color="primary"
						type="submit"
						size='large'
						loading={uploading}
						loadingIndicator={null}
						loadingPosition="start"
						disabled={!validTitle || uploadedFiles.length === 0}
						startIcon={!uploading && <CloudUploadIcon sx={{ marginRight: 1 }} />}
						sx={{
							width: '100%',
							marginTop: '1rem',
							'& .MuiLoadingButton-loadingIndicator': {
									display: 'none', // hide default loading spinner
							},
					}}
					>
						{uploading ? (
							<>
								<CircularProgress size={18} color="inherit" sx={{ marginRight: 2 }} />
								Uploading...
							</>
						) : (
							"Upload"
						)}
					</LoadingButton>
				</form>
			</Paper>

		</Container >
	)
}

export default Upload