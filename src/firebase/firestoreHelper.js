import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  onSnapshot 
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './config';
import { INITIAL_DATA } from './initialData';

// Local storage key for fallback reactivity
const LOCAL_STORAGE_KEY_PREFIX = 'spartan28_db_';

// Initialize fallback local store if needed
const getLocalCollection = (collectionName) => {
  try {
    const raw = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}${collectionName}`);
    if (raw) {
      return JSON.parse(raw);
    }
    // Seed initial data if present
    if (INITIAL_DATA[collectionName]) {
      localStorage.setItem(
        `${LOCAL_STORAGE_KEY_PREFIX}${collectionName}`, 
        JSON.stringify(INITIAL_DATA[collectionName])
      );
      return INITIAL_DATA[collectionName];
    }
  } catch (e) {
    console.error('Error reading localStorage fallback:', e);
  }
  return INITIAL_DATA[collectionName] || [];
};

const setLocalCollection = (collectionName, items) => {
  try {
    localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}${collectionName}`, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent('spartan28_db_update', { detail: { collection: collectionName } }));
  } catch (e) {
    console.error('Error writing localStorage fallback:', e);
  }
};

/**
 * Universal Firestore helper functions that seamlessly bridge between
 * real Firestore (when configured) and local reactive state.
 */
export const dbService = {
  /**
   * Fetch all items from a collection
   */
  async getCollection(collectionName) {
    if (isFirebaseConfigured && db) {
      try {
        const colRef = collection(db, collectionName);
        const snapshot = await getDocs(colRef);
        return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      } catch (err) {
        console.warn(`[Firestore] getCollection(${collectionName}) fallback to local store:`, err.message);
      }
    }
    return getLocalCollection(collectionName);
  },

  /**
   * Fetch single document by ID
   */
  async getDocument(collectionName, docId) {
    if (isFirebaseConfigured && db) {
      try {
        const docRef = doc(db, collectionName, docId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          return { id: docSnap.id, ...docSnap.data() };
        }
      } catch (err) {
        console.warn(`[Firestore] getDocument(${collectionName}, ${docId}) fallback:`, err.message);
      }
    }
    const items = getLocalCollection(collectionName);
    return items.find(item => item.id === docId) || null;
  },

  /**
   * Add a new document
   */
  async addDocument(collectionName, data) {
    if (isFirebaseConfigured && db) {
      try {
        const colRef = collection(db, collectionName);
        const docRef = await addDoc(colRef, {
          ...data,
          createdAt: new Date().toISOString()
        });
        return { id: docRef.id, ...data };
      } catch (err) {
        console.warn(`[Firestore] addDocument(${collectionName}) fallback:`, err.message);
      }
    }
    const items = getLocalCollection(collectionName);
    const newId = data.id || `${collectionName.slice(0, 3).toUpperCase()}-${Date.now().toString().slice(-4)}`;
    const newItem = {
      ...data,
      id: newId,
      createdAt: data.createdAt || new Date().toISOString().replace('T', ' ').slice(0, 16)
    };
    const updated = [newItem, ...items];
    setLocalCollection(collectionName, updated);
    return newItem;
  },

  /**
   * Update an existing document
   */
  async updateDocument(collectionName, docId, updates) {
    if (isFirebaseConfigured && db) {
      try {
        const docRef = doc(db, collectionName, docId);
        await updateDoc(docRef, {
          ...updates,
          updatedAt: new Date().toISOString()
        });
        return { id: docId, ...updates };
      } catch (err) {
        console.warn(`[Firestore] updateDocument(${collectionName}, ${docId}) fallback:`, err.message);
      }
    }
    const items = getLocalCollection(collectionName);
    const updated = items.map(item => {
      if (item.id === docId) {
        return { ...item, ...updates, updatedAt: new Date().toISOString() };
      }
      return item;
    });
    setLocalCollection(collectionName, updated);
    return { id: docId, ...updates };
  },

  /**
   * Delete a document
   */
  async deleteDocument(collectionName, docId) {
    if (isFirebaseConfigured && db) {
      try {
        const docRef = doc(db, collectionName, docId);
        await deleteDoc(docRef);
        return true;
      } catch (err) {
        console.warn(`[Firestore] deleteDocument(${collectionName}, ${docId}) fallback:`, err.message);
      }
    }
    const items = getLocalCollection(collectionName);
    const updated = items.filter(item => item.id !== docId);
    setLocalCollection(collectionName, updated);
    return true;
  },

  /**
   * Reset store back to initial seed data
   */
  resetToInitial() {
    Object.keys(INITIAL_DATA).forEach(key => {
      localStorage.removeItem(`${LOCAL_STORAGE_KEY_PREFIX}${key}`);
    });
    window.location.reload();
  }
};
