import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Container, Box, AppBar, Typography, CssBaseline} from "@mui/material";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import Playlist from "./Playlist";
import Grid2 from '@mui/material/Grid2';


const exampleTrack = {
  id: "1234567890",
  name: "Example Song",
  artist: "Example Artist",
  album: "Example Album",
  uri: "spotify:track:1234567890",
  albumCover: "https://example.com/album-cover.jpg",
  duration: "3:30",
};

function App() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        // maxHeight: "100vh",
        height: "100%",
        width: "70vw",
      }}
    >
      <CssBaseline />
      {/* Header */}
      <AppBar position="static" component="header">
        <Container maxWidth="lg">
          <Typography variant="h4" component="h1" sx={{ py: 2 }}>
            Jammming
          </Typography>
        </Container>
      </AppBar>

      {/* Main Content */}
      <Container
        component="main"
        maxWidth="lg"
        sx={{
          flexGrow: 1,
          py: 4,
        }}
      >
        {/* Ici viendront vos composants SearchBar, SearchResults et Playlist */}
        <SearchBar />
        <Box sx={{flexGrow: 1, marginTop: '3rem'}}>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <SearchResults tracks={[exampleTrack, exampleTrack]} />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Playlist playlistTracks={[exampleTrack, exampleTrack]} />
            </Grid2>
          </Grid2>
        </Box>
      </Container>

      {/* Footer */}
      <Box
        component="footer"
        sx={{ py: 3, bgcolor: "primary.main", color: "white" }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" align="center">
            © 2023 Jammming
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

export default App;
