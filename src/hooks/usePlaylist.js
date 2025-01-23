import { useState, useCallback, useMemo } from 'react';
import { createSpotifyService } from '../services/spotifyService';

export const usePlaylist = (token) => {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState(null);

  const spotifyService = useMemo(
    () => createSpotifyService(token),
    [token]
  );

  const createNewPlaylist = useCallback(async (name, tracks) => {
    if (!name || !tracks.length) {
      setError('Nom et pistes requis');
      return null;
    }

    setIsCreating(true);
    setError(null);

    try {
      const playlist = await spotifyService.createPlaylist(name, tracks);
      return playlist;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setIsCreating(false);
    }
  }, [spotifyService]);

  return {
    createNewPlaylist,
    isCreating,
    error
  };
};