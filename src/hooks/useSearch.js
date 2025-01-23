import { useState, useMemo } from 'react';
import { createSpotifyService } from '../services/spotifyService';

export const useSearch = (token) => {
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);

  const spotifyService = useMemo(
    () => createSpotifyService(token),
    [token]
  );

  const searchTracks = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    setError(null);

    try {
      const results = await spotifyService.searchTracks(query);
      setSearchResults(results);
    } catch (err) {
      setError(err.message);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  return {
    searchResults,
    isSearching,
    error,
    searchTracks,
    spotifyService
  };
};