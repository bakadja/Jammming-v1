export const createSpotifyService = (token) => {
  const headers = {
    Authorization: `Bearer ${token?.access_token}`,
    "Content-Type": "application/json",
  };

  const formatSearchQuery = (query) => {
    return query
      .trim()
      .split(' ')
      .filter(term => term.length > 0)
      .join('+');
  };

  return {
    async searchTracks(query) {
      try {
        const formattedQuery = formatSearchQuery(query);
        console.log("Recherche de pistes avec:", formattedQuery);
        
        const url = `https://api.spotify.com/v1/search?q=${formattedQuery}&type=track&limit=10`;
        console.log("URL finale:", url);
        
        const response = await fetch(url, {
          method: "GET",
          headers,
        });

        if (!response.ok) {
          throw new Error(`Search failed: ${response.status}`);
        }

        const data = await response.json();
        return data.tracks.items;
      } catch (error) {
        console.error("Search error:", error);
        throw error;
      }
    },
    
    async getUserData() {
      try {
        const response = await fetch('https://api.spotify.com/v1/me', {
          method: 'GET',
          headers,
        });

        if (!response.ok) {
          throw new Error(`Failed to get user data: ${response.status}`);
        }

        return await response.json();
      } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
      }
    },
    
    async createPlaylist(name, tracks) {
      try {
        // Créer une playlist vide
        const userId = await this.getUserData().then(data => data.id);
        const createResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            name,
            description: 'Created with Jammming',
            public: true
          })
        });

        if (!createResponse.ok) {
          throw new Error(`Failed to create playlist: ${createResponse.status}`);
        }

        const playlist = await createResponse.json();

        // Ajouter les tracks à la playlist
        const trackUris = tracks.map(track => track.uri);
        const addTracksResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            uris: trackUris
          })
        });

        if (!addTracksResponse.ok) {
          throw new Error(`Failed to add tracks: ${addTracksResponse.status}`);
        }

        return playlist;
      } catch (error) {
        console.error('Error creating playlist:', error);
        throw error;
      }
    },
  };
};
