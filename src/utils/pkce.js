/**
 * Generates a random code verifier string for PKCE (Proof Key for Code Exchange).
 * The generated string contains only characters from the set [A-Z], [a-z], [0-9], "-", ".", "_", "~"
 * as per RFC 7636 specifications.
 *
 * @param {number} [length=128] - The length of the code verifier to generate
 * @returns {string} A random string of the specified length containing only allowed characters
 *
 * @example
 * const verifier = generateCodeVerifier(); // generates 128 character string
 * const shortVerifier = generateCodeVerifier(43); // generates 43 character string
 */
export function generateCodeVerifier(length = 128) {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}

/**
 * Generates a code challenge for PKCE (Proof Key for Code Exchange) authentication.
 * The code challenge is derived from the verifier using SHA-256 hashing and base64url encoding.
 * 
 * @async
 * @param {string} verifier - The code verifier string to generate the challenge from
 * @returns {Promise<string>} A base64url encoded string representing the code challenge
 * @throws {Error} If the crypto operations fail
 */
export async function generateCodeChallenge(verifier) {
  // Validation du vérificateur
  if (!verifier || typeof verifier !== 'string') {
    throw new Error('Le code vérificateur doit être une chaîne non vide');
  }

  try {
    // Encodage UTF-8
    const data = new TextEncoder().encode(verifier);
    
    // Hash SHA-256
    const digest = await window.crypto.subtle.digest("SHA-256", data);
    
    // Encodage base64URL
    return btoa(String.fromCharCode(...new Uint8Array(digest)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
      
  } catch (error) {
    throw new Error(`Erreur lors de la génération du challenge: ${error.message}`);
  }
}
