// import React from "react";
// import { Stack, TextField, Button } from '@mui/material';

// export default function SearchBar() {
//   return (
//     <Stack spacing={2} direction="column" sx={{alignItems: "center"}}>
//       <TextField label="Enter A Song Title" sx={{ width: "50%" }} />
//       <Button
//         variant="contained"
//         color="primary"
//         sx={{ width: "20%", alignSelf: "center" }}
//       >
//         SEARCH
//       </Button>
//     </Stack>
//   );
// }

/* eslint-disable react/prop-types */
import React from "react";
import { Stack, TextField, Button } from "@mui/material";

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Recherche soumise:", searchTerm);
    if (!searchTerm.trim()) return;
    onSearch(searchTerm);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    console.log("Nouvelle valeur:", value);
    setSearchTerm(value);
  };

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit}
      spacing={2}
      direction="column"
      sx={{ alignItems: "center" }}
    >
      <TextField
        label="Rechercher un titre"
        value={searchTerm}
        onChange={handleChange}
        sx={{ width: "50%" }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={!searchTerm.trim()}
        sx={{ width: "20%", alignSelf: "center" }}
      >
        RECHERCHER
      </Button>
    </Stack>
  );
}

export default React.memo(SearchBar);
