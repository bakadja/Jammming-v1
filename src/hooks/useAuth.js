import { useState, useEffect, useCallback, useRef } from "react";
import { spotifyConfig } from "../utils/spotifyConfig";
import { authService } from "../services/authService";

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const refreshTimeoutRef = useRef(null);
  useEffect(() => {
    console.log('Current token:', token);
  }, [token]);
  const login = useCallback(async () => {
     try {
      const possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const randomValues = crypto.getRandomValues(new Uint8Array(64));
      const randomString = randomValues.reduce(
        (acc, x) => acc + possible[x % possible.length],
        ""
      );

      const codeVerifier = randomString;
      const data = new TextEncoder().encode(codeVerifier);
      const hashed = await crypto.subtle.digest("SHA-256", data);

      const codeChallenge = btoa(String.fromCharCode(...new Uint8Array(hashed)))
        .replace(/=/g, "")
        .replace(/\+/g, "-")
        .replace(/\//g, "_");

      localStorage.setItem("code_verifier", codeVerifier);

      const authUrl = new URL(spotifyConfig.authorizationEndpoint);
      const params = {
        response_type: "code",
        client_id: spotifyConfig.clientId,
        scope: spotifyConfig.scope,
        code_challenge_method: "S256",
        code_challenge: codeChallenge,
        redirect_uri: spotifyConfig.redirectUrl,
      };

      authUrl.search = new URLSearchParams(params).toString();
      window.location.href = authUrl.toString();
    } catch (err) {
      setError(err);
    }
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    localStorage.removeItem("spotify_token");
    localStorage.removeItem("code_verifier");
    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
    }
  }, []);

  const scheduleTokenRefresh = useCallback((refreshToken) => {
    refreshTimeoutRef.current = setTimeout(async () => {
      try {
        const newToken = await authService.refreshToken(refreshToken);
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
          const tokenResponse = await authService.getToken(code);
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

  return { token, loading, error, login, logout };
};
