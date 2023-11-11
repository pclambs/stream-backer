import { useQuery } from '@apollo/client';
import { QUERY_PROFILES } from '../utils/queries'
import NavBar from '../components/NavBar'
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";



const Home = () => {

  return (
    <div>
      <NavBar />
       <h2>Hello!</h2>
      <Box>
        <CssBaseline />
        <Container fixed>
          <Box sx={{ bgcolor: "#cfe8fc", height: "50vh" }} />
        </Container>
      </Box>
    </div>
  );
}

export default Home;
