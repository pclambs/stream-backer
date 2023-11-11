import { useLocation, useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'

const Footer = () => {
  const location = useLocation()
  const navigate = useNavigate()
  return (
    <footer>
      <div>
        {location.pathname !== '/' && (
          <Button 
            onClick={() => navigate(-1)}
            variant="outlined" 
            color="primary" 
            size='small'
            className='back-btn'
            sx={{
              borderRadius: '50%', 
              minWidth: '40px',    
              height: '40px',     
              padding: '10px',    
            }}
          >
            &larr;
          </Button>
        )}
        <h4 className='footer-text'>&copy; {new Date().getFullYear()} - Adam Baker, Paul Lambert, Max Rice, & Lindsay Shank-Kirchner</h4>
      </div>
    </footer>
  )
}

export default Footer
