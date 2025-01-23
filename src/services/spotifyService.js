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
  };
};
