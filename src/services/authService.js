import { spotifyConfig } from "../utils/spotifyConfig";
console.log("spotifyConfig", spotifyConfig);

/**
 * Service for handling Spotify API authentication and user data retrieval
 */

/**
 * Exchanges an authorization code for an access token
 * @param {string} code - The authorization code received from Spotify
 * @throws {Error} If code verifier is not found in localStorage or if code is missing
 * @returns {Promise<Object>} Token response containing access_token, refresh_token etc
 */

/**
 * Refreshes an expired access token using a refresh token
 * @param {string} refreshToken - The refresh token to use
 * @throws {Error} If refresh token is missing or if request fails
 * @returns {Promise<Object>} New token response containing access_token etc
 */

/**
 * Retrieves the current user's Spotify profile
 * @param {string} accessToken - Valid access token for authentication
 * @throws {Error} If access token is missing or if request fails
 * @returns {Promise<Object>} User profile data from Spotify
 */

export const authService = {
  async getToken(code) {
    const codeVerifier = localStorage.getItem("code_verifier");
    if (!codeVerifier || !code) {
      throw new Error("Code verifier code not found in localStorage");
    }

    try {
      const response = await fetch(spotifyConfig.tokenEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: spotifyConfig.clientId,
          grant_type: "authorization_code",
          code: code,
          redirect_uri: spotifyConfig.redirectUrl,
          code_verifier: codeVerifier,
        }),
      });

      return await response.json();
    } catch (error) {
      console.error("Error getting token:", error);
      throw error;
    }
  },

  async refreshToken(refreshToken) {
    if (!refreshToken) {
      throw new Error("Refresh token is required");
    }

    try {
      const response = await fetch(spotifyConfig.tokenEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: spotifyConfig.clientId,
          grant_type: "refresh_token",
          refresh_token: refreshToken,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error refreshing token:", error);
      throw error;
    }
  },
};


