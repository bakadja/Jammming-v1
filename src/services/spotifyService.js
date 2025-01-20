export const createSpotifyService = (token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  return {
    async searchTracks(query) {
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/search?q=${encodeURIComponent(
            query
          )}&type=track`,
          { headers }
        );
        if (!response.ok) throw new Error("Search failed");
        const data = await response.json();
        return data.tracks.items;
      } catch (error) {
        console.error("Search error:", error);
        throw error;
      }
    },

    async createPlaylist(name, tracks) {
      try {
        // 1. Get user ID
        const userResponse = await fetch("https://api.spotify.com/v1/me", {
          headers,
        });
        const userData = await userResponse.json();

        // 2. Create playlist
        const createResponse = await fetch(
          `https://api.spotify.com/v1/users/${userData.id}/playlists`,
          {
            method: "POST",
            headers,
            body: JSON.stringify({ name, public: false }),
          }
        );
        const playlistData = await createResponse.json();

        // 3. Add tracks
        await fetch(
          `https://api.spotify.com/v1/playlists/${playlistData.id}/tracks`,
          {
            method: "POST",
            headers,
            body: JSON.stringify({
              uris: tracks.map((track) => track.uri),
            }),
          }
        );

        return playlistData;
      } catch (error) {
        console.error("Failed to create playlist:", error);
        throw error;
      }
    },
  };
};
