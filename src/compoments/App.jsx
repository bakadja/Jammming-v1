import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Box, CssBaseline, CircularProgress } from "@mui/material";
import MainContent from "./MainContent";
// import { useAuth } from "../hooks/useAuth";
// import { useDatabase } from "../hooks/useDatabase";
//import Authentification from "./ui/Authentification";

function App() {
  // const { isAuthenticated, token, login } = useAuth();
  // const { isInitialized, db } = useDatabase();
  // console.log("isAuthenticated [App]", isAuthenticated);


  // // Si pas authentifié, afficher la page de connexion
  // if (!isAuthenticated) {
  //   return <Authentification login={login} />;
  // }

  // // Si la base de données n'est pas initialisée, afficher le chargement
  // if (!isInitialized) {
  //   return (
  //     <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
  //       <CircularProgress />
  //     </Box>
  //   );
  // }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        height: "100%",
        width: "70vw",
      }}
    >
      <CssBaseline />
      {/* <MainContent token={token} db={db} /> */}
      <MainContent />
    </Box>
  );
}

export default App;
