export const spotifyConfig = {
  clientId: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
  redirectUrl: import.meta.env.VITE_SPOTIFY_REDIRECT_URL,
  authorizationEndpoint: import.meta.env.VITE_SPOTIFY_AUTH_ENDPOINT,
  tokenEndpoint: import.meta.env.VITE_SPOTIFY_TOKEN_ENDPOINT,
  scope: import.meta.env.VITE_SPOTIFY_SCOPE,
};
