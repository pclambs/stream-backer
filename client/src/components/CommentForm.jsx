import { Box, TextField } from '@mui/material'
import { Button } from '@mui/material'


const mainColor = "secondary"

const submitComment = () => {
    alert('click')
}

const CommentForm = () => {


    return (
        <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
        id="outlined-helperText"
        label="Type your comment"
        defaultValue="Be nice!"
        multiline
        helperText=""
      />
      <Button
      variant="contained"
      color= {mainColor}
      
      onClick = {submitComment}
      >Submit</Button>
      </Box>
    )
}

export default CommentForm