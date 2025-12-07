import Dexie from 'dexie';

export const db = new Dexie('restaurantApp');
db.version(1).stores({
    users: '++id,name,email,isSynced',
    branches: "id, name, business_id",
    variations: "id, branch_id",
    variation_items: "id, variation_id",
    addons: "id, name, branch_id",
    categories: "id, name",
});
db.open().catch((err) => console.error("Dexie open failed:", err));