const dbRequest = indexedDB.open("budgetDB", 1);
let db = null; 

dbRequest.onupgradeneeded = (event)=>{
    console.log("initializing database.....");
    // collections called ---> object store

    db = event.target.result;
    db.createObjectStore("offlineInput", { autoIncrement: true });
};

dbRequest.onsuccess = (event)=>{
    db = event.target.result;
    if (navigator.onLine) {
        checkDatabase();
        console.log(`Successfully opened connect to indexedDB :${db.name}`)
    };

};

dbRequest.onerror = (event)=>{
    console.log(`Error opening connection to indexedDB: ${event.target.errorCode}`)
};

// coming from index.js sendTranscation function. 
const saveRecord = (record)=>{
    // console.log("record", record)
    const budgeStore = db.transaction(["offlineInput"], "readwrite").objectStore("offlineInput");
    budgeStore.add(record);

}

const checkDatabase = () => {
    const budgeStore = db.transaction(["offlineInput"], "readwrite").objectStore("offlineInput");
    const getAllData = budgeStore.getAll();

    getAllData.onsuccess = () => {
        if (getAllData.result.length > 0) {
            fetch("/api/transaction/bulk", {
                method: "POST",
                body: JSON.stringify(getAllData.result),
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json"
                }
            })
                .then(response => response.json())
                .then(() => {
                    const budgeStore = db.transaction(["offlineInput"], "readwrite").objectStore("offlineInput");

                    // clear all items in store
                    budgeStore.clear();
                });
        }
    }
};

window.addEventListener("online", checkDatabase);
