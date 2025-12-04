import Dexie from 'dexie';

export const db = new Dexie('restaurantApp');
db.version(1).stores({
    users: '++id,name,email,isSynced',
    branches: "id, name, business_id",
    variations: "id, name, branch_id",
    addons: "id, name, branch_id",
});
db.open().catch((err) => console.error("Dexie open failed:", err));