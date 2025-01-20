import React from "react";
import { Stack, TextField, Button } from '@mui/material';

export default function SearchBar() {
  return (
    <Stack spacing={2} direction="column">
      <TextField label="Enter A Song Title" />
      <Button
        variant="contained"
        color="primary"
        sx={{ width: "20%", alignSelf: "center" }}
      >
        SEARCH
      </Button>
    </Stack>
  );
}
