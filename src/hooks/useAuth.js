import { useState, useEffect, useCallback, useRef } from "react";
import { spotifyConfig } from "../utils/spotifyConfig";
import { spotifyService } from "../services/spotifyService";

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const refreshTimeoutRef = useRef(null);

  const login = useCallback(() => {
    const scope = "user-read-private playlist-modify-public";
    const args = new URLSearchParams({
      response_type: "code",
      client_id: spotifyConfig.clientId,
      scope: scope,
      redirect_uri: spotifyConfig.redirectUrl,
    });
    window.location = `https://accounts.spotify.com/authorize?${args}`;
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    localStorage.removeItem("spotify_token");
    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
    }
  }, []);

  const scheduleTokenRefresh = useCallback((refreshToken) => {
    refreshTimeoutRef.current = setTimeout(async () => {
      try {
        const newToken = await spotifyService.refreshToken(refreshToken);
        setToken(newToken);
        localStorage.setItem("spotify_token", JSON.stringify(newToken));
        scheduleTokenRefresh(newToken.refresh_token);
      } catch (err) {
        setError(err);
      }
    }, 2700 * 1000);
  }, []);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const args = new URLSearchParams(window.location.search);
        const code = args.get("code");

        if (code) {
          const tokenResponse = await spotifyService.getToken(code);
          setToken(tokenResponse);
          localStorage.setItem("spotify_token", JSON.stringify(tokenResponse));
          window.history.replaceState({}, document.title, "/");
          scheduleTokenRefresh(tokenResponse.refresh_token);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
    return () => {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
    };
  }, [scheduleTokenRefresh]);

  return {
    token,
    loading,
    error,
    login,
    logout,
  };
};
