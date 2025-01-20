import { useEffect, useState } from "react";
import { authService } from "../services/authService";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        if (authService.isTokenValid()) {
          const storedToken = authService.getStoredToken();
          setToken(storedToken);
          setIsAuthenticated(true);
        } else {
          // Vérifier le code dans l'URL
          const urlParams = new URLSearchParams(window.location.search);
          const code = urlParams.get('code');
          
          if (code) {
            const token = await authService.exchangeCodeForToken(code);
            authService.storeToken(token);
            setToken(token);
            setIsAuthenticated(true);
            window.history.pushState({}, '', '/');
          }
        }
      } catch (error) {
        console.error('Erreur d\'authentification:', error);
        setIsAuthenticated(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async () => {
    try {
      const loginUrl = await authService.getLoginUrl();
      window.location = loginUrl;
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      // Afficher un message d'erreur à l'utilisateur
    }
  };

  const logout = () => {
    try {
      // Nettoyage du localStorage
      localStorage.removeItem("spotify_token");
      localStorage.removeItem("token_timestamp");
      localStorage.removeItem("code_verifier"); // Ajout du nettoyage du vérificateur PKCE

      // Réinitialisation de l'état
      setToken(null);
      setIsAuthenticated(false);

      // Optionnel : Redirection vers la page d'accueil
      window.location.href = '/';
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return { isAuthenticated, token, login, logout };
};
