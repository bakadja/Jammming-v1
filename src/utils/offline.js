export const initializeOfflineSupport = (db) => {
  window.addEventListener("online", async () => {
    // Synchroniser la file d'attente
    await db.processSyncQueue();
  });

  window.addEventListener("offline", () => {
    // Peut-être afficher une notification
    console.log("App is offline - changes will be synced later");
  });
};
