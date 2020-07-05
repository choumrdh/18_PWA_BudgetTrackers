const dbRequest = indexedDB.open("budgeDB", 1);

dbRequest.onupgradeneeded = event => {
    console.log("initializing database.....");
    // collections called ---> object store

    const db = event.target.result;
    const store = db.createObjectStore("budge", { autoIncrement: true });
    // store.createIndex("statusIndex", "status");
};

dbRequest.onsuccess = event => {
    const db = event.target.result;
    console.log(`Successfully opened connect to indexedDB :${db.name}`)
    addData(db)
};

dbRequest.onerror = event => {
    console.log(`Error opening connection to indexedDB: ${event.target.error}`)
};
// const addData = (db, data) => {
//     const budgeStore = db.transaction(["budge"], "readwrite").transcation.objectStore("budge");
//     budgeStore.add({data});
// };

// const getAllData = ()=>{

// };