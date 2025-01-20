import { useState, useEffect } from 'react';
import { createDatabaseService } from '../services/databaseService';

export const useDatabase = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [dbService, setDbService] = useState(null);

  useEffect(() => {
    const initDb = async () => {
      try {
        const service = createDatabaseService();
        const success = await service.initialize();
        if (success) {
          setDbService(service);
          setIsInitialized(true);
        }
      } catch (error) {
        console.error('Erreur d\'initialisation:', error);
        setIsInitialized(false);
      }
    };
    initDb();
  }, []);

  return {
    isInitialized,
    db: dbService?.db,
    cleanOldRecords: dbService?.cleanOldRecords,
    processSyncQueue: dbService?.processSyncQueue
  };
};
