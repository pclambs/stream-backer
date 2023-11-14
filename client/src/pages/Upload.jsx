import React, { useState } from 'react'
import { Button, Typography, Container, Paper } from '@mui/material'
import CustomTextField from '../components/CustomTextField'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'


//Page to upload a new video or edit existing one
const Upload = () => {
	const [formState, setFormState] = useState({
		title: '',
    description: '',
    tags: '',
  });

	const handleChange = (event) => {
		const { name, value } = event.target
	
		setFormState({
			...formState,
			[name]: value,
		})
	}
	
	return (
		<Container disableGutters sx={{marginY: 1.2}}>
			<Paper>
				<Typography variant="h3" sx={{}}>Upload a New Video</Typography>
					<form>
						<CustomTextField
							name="title"
							type="tet"
							value={formState.title}
							onChange={handleChange}
							variant='standard'
							label='Title'
							margin='normal'
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
							margin='normal'
						/>
						<CustomTextField
							name="tags"
							type="text"
							value={formState.tags}
							onChange={handleChange}
							variant='standard'
							label='Tags'
							margin='normal'
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