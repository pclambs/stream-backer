import { useLocation, useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'

const Footer = () => {
  const location = useLocation()
  const navigate = useNavigate()
  return (
    <footer>
      <div>
        <p className='footer-text'>&copy; {new Date().getFullYear()} - Adam Baker, Paul Lambert, Max Rice, & Lindsay Shank-Kirchner</p>
      </div>
    </footer>
  )
}

export default Footer
