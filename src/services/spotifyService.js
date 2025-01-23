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
  };
};
