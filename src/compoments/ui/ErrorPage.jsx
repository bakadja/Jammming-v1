/* eslint-disable react/prop-types */
import React from "react";
import { Alert, AlertTitle, Button, Container } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

function ErrorPage({ error }) {
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Alert
        severity="error"
        action={
          <Button
            color="error"
            size="small"
            startIcon={<RefreshIcon />}
            onClick={() => window.location.reload()}
          >
            Réessayer
          </Button>
        }
      >
        <AlertTitle>Une erreur est survenue</AlertTitle>
        {error.message || "Une erreur inattendue s'est produite."}
      </Alert>
    </Container>
  );
}

export default React.memo(ErrorPage);
