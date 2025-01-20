import Dexie from 'dexie';

// Configuration
const DB_NAME = 'JammmingDB';
const DB_VERSION = 1;
const RETENTION_DAYS = 30;
const MAX_SYNC_RETRIES = 3;

// Classe d'erreur personnalisée
class DatabaseError extends Error {
  constructor(message, operation) {
    super(`Database Error during ${operation}: ${message}`);
    this.name = 'DatabaseError';
  }
}

export const createDatabaseService = () => {
  const db = new Dexie(DB_NAME);

  // Schéma de la base de données
  db.version(DB_VERSION).stores({
    currentPlaylist: "++id, name, tracks, status, &spotifyId, timestamp",
    searchHistory: "++id, query, results, timestamp, &uri",
    syncQueue: "++id, action, data, timestamp, status, retries",
  });

  const validateData = (data, schema) => {
    // Validation basique des données
    if (!data || typeof data !== 'object') {
      throw new DatabaseError('Invalid data format', 'validation');
    }
    // Validation du schéma
    for (const [key, type] of Object.entries(schema)) {
      if (!(key in data) || typeof data[key] !== type) {
        throw new DatabaseError(`Invalid ${key} format`, 'validation');
      }
    }
    return true;
  };

  const initialize = async () => {
    try {
      await db.open();
      await cleanOldRecords();
      console.log('Database initialized');
      return true;
    } catch (error) {
      console.error('Database initialization failed:', error);
      return false;
    }
  };

  const cleanOldRecords = async () => {
    const cutoffDate = Date.now() - (RETENTION_DAYS * 24 * 60 * 60 * 1000);
    try {
      await db.transaction('rw', [db.searchHistory, db.syncQueue], async () => {
        await db.searchHistory.where('timestamp').below(cutoffDate).delete();
        await db.syncQueue.where('timestamp').below(cutoffDate).delete();
      });
    } catch (error) {
      throw new DatabaseError(error.message, 'cleanup');
    }
  };

  const processSyncQueue = async () => {
    try {
      const pendingItems = await db.syncQueue
        .where('status')
        .equals('pending')
        .filter(item => item.retries < MAX_SYNC_RETRIES)
        .toArray();

      for (const item of pendingItems) {
        try {
          // Traitement de l'élément
          await db.syncQueue.update(item.id, {
            status: 'completed',
            timestamp: Date.now()
          });
        } catch (error) {
          await db.syncQueue.update(item.id, {
            status: 'failed',
            retries: (item.retries || 0) + 1,
            lastError: error.message,
            timestamp: Date.now()
          });
        }
      }
    } catch (error) {
      throw new DatabaseError(error.message, 'sync');
    }
  };

  return {
    initialize,
    cleanOldRecords,
    processSyncQueue,
    db
  };
};
