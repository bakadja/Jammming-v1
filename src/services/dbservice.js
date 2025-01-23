import localforage from 'localforage';

// Initialize localforage configuration
localforage.config({
    driver: localforage.INDEXEDDB,
    name: "spotify-playlist",
    storeName: "playlists",
});

export const savePlaylist = async (playlist) => {
    try {
        await localforage.setItem(playlist.name, playlist);
        return true;
    } catch (error) {
        console.error('Error saving playlist:', error);
        return false;
    }
};

export const getPlaylists = async () => {
    try {
        const playlists = [];
        await localforage.iterate((value) => {
            playlists.push(value);
        });
        return playlists;
    } catch (error) {
        console.error('Error getting playlists:', error);
        return [];
    }
};

export const deletePlaylist = async (playlistName) => {
    try {
        await localforage.removeItem(playlistName);
        return true;
    } catch (error) {
        console.error('Error deleting playlist:', error);
        return false;
    }
};

export const updatePlaylist = async (oldName, updatedPlaylist) => {
    try {
        // Supprimer l'ancienne version
        await localforage.removeItem(oldName);
        // Sauvegarder la nouvelle version
        await localforage.setItem(updatedPlaylist.name, updatedPlaylist);
        return true;
    } catch (error) {
        console.error('Erreur lors de la mise à jour:', error);
        return false;
    }
};
