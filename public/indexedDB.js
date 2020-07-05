const dbRequest = indexedDB.open("budgeDB", 1);

dbRequest.onsuccess = event => {
    const db = event.target.result;
    console.log(`Successfully opened connect to indexedDB :${db.name}`)
};

dbRequest.onerror = event => {
    console.log(`Error opening connection to indexedDB: ${event.target.error}`)
};