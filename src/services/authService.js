import { encrypt, decrypt } from 'crypto-js/aes';
import { generateCodeVerifier, generateCodeChallenge } from '../utils/pkce.js';

export const authService = {
  SPOTIFY_AUTH_URL: "https://accounts.spotify.com/authorize",
  CLIENT_ID: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
  CLIENT_SECRET: import.meta.env.VITE_CLIENT_SECRET,
  REDIRECT_URI: import.meta.env.VITE_REDIRECT_URI,
  ENCRYPTION_KEY: import.meta.env.VITE_ENCRYPTION_KEY,

  async initializePKCE() {
    try {
      const codeVerifier = generateCodeVerifier();
      const codeChallenge = await generateCodeChallenge(codeVerifier);
      
      // Chiffrement du vérificateur avant stockage
      const encryptedVerifier = encrypt(codeVerifier, this.ENCRYPTION_KEY);
      localStorage.setItem('code_verifier', encryptedVerifier);
    
      return codeChallenge;
    } catch (error) {
      console.error("Erreur lors de l'initialisation PKCE:" + error);
      throw error;
    }
  },

  async getLoginUrl() {
    const scope = "playlist-modify-public playlist-modify-private";
    const codeChallenge = await this.initializePKCE();
    return `${this.SPOTIFY_AUTH_URL}?client_id=${this.CLIENT_ID}&redirect_uri=${this.REDIRECT_URI}&scope=${scope}&response_type=code&code_challenge_method=S256&code_challenge=${codeChallenge}`;
  },

  getStoredToken() {
    try {
      const encryptedToken = localStorage.getItem("spotify_token");
      if (!encryptedToken) return null;
      
      const decryptedToken = decrypt(encryptedToken, this.ENCRYPTION_KEY).toString();
      return decryptedToken || null;
    } catch (error) {
      console.error("Erreur lors du déchiffrement du token:", error);
      return null;
    }
  },

  storeToken(token) {
    if (!token) {
      throw new Error('Token invalide');
    }
    try {
      const encryptedToken = encrypt(token, this.ENCRYPTION_KEY);
      localStorage.setItem("spotify_token", encryptedToken);
      localStorage.setItem("token_timestamp", Date.now());
    } catch (error) {
      console.error('Erreur lors du stockage du token:', error);
      throw error;
    }
  },

  async rotateToken() {
    try {
      if (this.isTokenExpiringSoon()) {
        const newToken = await this.refreshAccessToken();
        this.storeToken(newToken);
        return true; // Indique que le token a été renouvelé
      }
      return false; // Indique qu'aucun renouvellement n'était nécessaire
    } catch (error) {
      console.error('Erreur lors de la rotation du token:', error);
      throw error;
    }
  },

  isTokenExpiringSoon() {
    const timestamp = localStorage.getItem("token_timestamp");
    if (!timestamp) return true;
    
    const TOKEN_LIFETIME = 3600000; // 1 heure en ms
    const THRESHOLD = 300000; // 5 minutes en ms
    
    try {
        return Date.now() - parseInt(timestamp) > (TOKEN_LIFETIME - THRESHOLD);
    } catch (error) {
        console.error('Erreur lors de la vérification du token:', error);
        return true; // Par précaution, suggère un renouvellement
    }
  },

  isTokenValid() {
    try {
      const token = this.getStoredToken();
      if (!token) return false;
      
      // Vérifie si le token n'est pas expiré
      return !this.isTokenExpiringSoon();
    } catch (error) {
      console.error('Erreur lors de la vérification du token:', error);
      return false;
    }
  },

  // Ajouter cette méthode au service
  async exchangeCodeForToken(code) {
    try {
      // Récupération et déchiffrement du code verifier
      const encryptedVerifier = localStorage.getItem('code_verifier');
      if (!encryptedVerifier) {
        throw new Error('Code verifier manquant');
      }

      const codeVerifier = decrypt(encryptedVerifier, this.ENCRYPTION_KEY).toString();
      if (!codeVerifier) {
        throw new Error('Échec du déchiffrement du code verifier');
      }

      // Validation du code d'autorisation
      if (!code || typeof code !== 'string') {
        throw new Error('Code d\'autorisation invalide');
      }

      console.log('Échange du code d\'autorisation...', { code: code.slice(0, 5) + '...' });

      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(this.CLIENT_ID + ':' + this.CLIENT_SECRET)
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          redirect_uri: this.REDIRECT_URI,
          client_id: this.CLIENT_ID
        }),
      });

      const data = await response.json();
      console.log('Réponse API:', data);

      // Gestion détaillée des erreurs
      if (!response.ok) {
        if (data.error === 'invalid_grant') {
          throw new Error('Code d\'autorisation expiré - veuillez vous reconnecter');
        }
        throw new Error(`Erreur Spotify: ${data.error} - ${data.error_description}`);
      }

      if (!data.access_token) {
        throw new Error('Token non présent dans la réponse');
      }

      console.log('Token obtenu avec succès');
      return data.access_token;

    } catch (error) {
      console.error('Erreur lors de l\'échange du code:', error);
      // Nettoyage en cas d'erreur
      localStorage.removeItem('code_verifier');
      throw error;
    }
  }
  
};


