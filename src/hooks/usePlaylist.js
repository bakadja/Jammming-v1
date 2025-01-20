export const usePlaylist = (db) => {
  const [playlist, setPlaylist] = useState({ name: "", tracks: [] });
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    // Charger la playlist locale au démarrage
    const loadLocalPlaylist = async () => {
      if (db) {
        const savedPlaylist = await db.getCurrentPlaylist();
        if (savedPlaylist.length > 0) {
          setPlaylist(savedPlaylist[0]);
        }
      }
    };
    loadLocalPlaylist();
  }, [db]);

  const addTrack = useCallback(
    async (track) => {
      if (!playlist.tracks.some((t) => t.id === track.id)) {
        const newPlaylist = {
          ...playlist,
          tracks: [...playlist.tracks, track],
        };
        setPlaylist(newPlaylist);
        if (db) await db.savePlaylist(newPlaylist);
      }
    },
    [playlist, db]
  );

  const removeTrack = useCallback(
    async (trackId) => {
      const newPlaylist = {
        ...playlist,
        tracks: playlist.tracks.filter((t) => t.id !== trackId),
      };
      setPlaylist(newPlaylist);
      if (db) await db.savePlaylist(newPlaylist);
    },
    [playlist, db]
  );

  return {
    playlist,
    addTrack,
    removeTrack,
    isSyncing,
  };
};
