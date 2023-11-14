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
        helperText=""
      />
      <Button
      variant="outlined"
      color= {mainColor}
      endIcon={<SendIcon />}
      onClick = {submitComment}
      >Send Comment</Button>
      </Box>
    )
}

export default CommentForm