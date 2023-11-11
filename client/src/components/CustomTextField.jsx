import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import theme from '../utils/theme'

const CustomTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.secondary.main,  // outline color
    },
    '&:hover fieldset': {
      borderColor: theme.palette.secondary.main, // hover color
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main, // focused color
    },
    '& .MuiInputBase-input': {
      color: theme.palette.secondary.main, // input text color
    },
  },
  '& .MuiInputLabel-root': {
    color: theme.palette.secondary.main, // inactive label color
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: theme.palette.primary.main, // focused label color
  },
})

export default CustomTextField