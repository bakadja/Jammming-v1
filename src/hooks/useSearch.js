export const useSearch = (spotifyService, db) => {
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);

  const search = useCallback(
    async (query) => {
      if (!query.trim()) return;

      setIsSearching(true);
      setError(null);

      try {
        // Vérifier d'abord dans l'historique local
        if (db) {
          const recentSearches = await db.getRecentSearches();
          const cachedSearch = recentSearches.find((s) => s.query === query);
          if (cachedSearch) {
            setResults(cachedSearch.results);
            setIsSearching(false);
            return;
          }
        }

        // Si pas en cache, faire la recherche
        const searchResults = await spotifyService.searchTracks(query);
        setResults(searchResults);

        // Sauvegarder dans l'historique
        if (db) {
          await db.saveSearchResults(query, searchResults);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsSearching(false);
      }
    },
    [spotifyService, db]
  );

  return { results, isSearching, error, search };
};
