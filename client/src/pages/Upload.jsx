import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { useParams, useNavigate } from 'react-router-dom'
import { Button, Typography, Container, Paper } from '@mui/material'
import CustomTextField from '../components/CustomTextField'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { ADD_VIDEO_POST, UPDATE_VIDEO_POST } from '../utils/mutations'


//Page to upload a new video or edit existing one
const Upload = () => {
	const [formState, setFormState] = useState({ title: '', description: '', tags: '', })
		// { error }
	const [addVideoPost] = useMutation(ADD_VIDEO_POST)
	const [updateVideoPost] = useMutation(UPDATE_VIDEO_POST)

	const { videoPostId } = useParams()
	const history = useNavigate()

	useEffect(() => {
		if (videoPostId) {
			const videoPost = videoPosts.find((videoPost) => videoPost._id === videoPostId)
			setFormState({
				title: videoPost.title,
				description: videoPost.description,
				tags: videoPost.tags,
			})
		}
	})

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

		if (videoPostId) {
			await updateVideoPost({ variables: { title, description, tags } })
		} else {
			await addVideoPost({ variables: { title, description, tags } })
		}
	}
	
	return (
		<Container disableGutters sx={{marginY: 1.2, display: 'flex', gap: '.75rem'}}>
			<Paper sx={{ borderRadius: 0 }}>
				<Typography variant="h3" sx={{ padding: '0 .5rem 0 .5rem'}}>Upload a New Video</Typography>
			</Paper>
			<Paper sx={{ padding: '.5rem',  borderRadius: 0 }}>
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
    //Must be logged in or be redirected to login page

    //If editing, pull in current object values and resave object to db
    //display "Edit Video" title
       
    //if not editing, blank values on form
    //display "Post a New Video" title