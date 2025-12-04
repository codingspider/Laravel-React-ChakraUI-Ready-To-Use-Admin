// hooks/useVariations.js
import { useState, useEffect } from "react";
import { db } from "../db";
import api from "../axios";
import { GET_BRANCH_VARIATIONS } from "../routes/apiRoutes";

export function useVariations() {
  const [variations, setVariations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch variations from Dexie or API
  const fetchVariations = async () => {
    setLoading(true);

    try {
      // Check local DB first
      const localVariations = await db.variations.toArray();
      if (localVariations.length > 0) {
        setVariations(localVariations);
      } else {
        // Fetch from API
        const res = await api.get(GET_BRANCH_VARIATIONS);
        setVariations(res.data.data);

        // Save to Dexie for next use
        await db.variations.clear();
        await db.variations.bulkAdd(res.data.data);
      }
    } catch (err) {
      console.error("fetchVariations error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Refresh variations manually
  const refreshVariations = async () => {
    setLoading(true);
    try {
      const res = await api.get(GET_BRANCH_VARIATIONS);
      setVariations(res.data.data);
      await db.variations.clear();
      await db.variations.bulkAdd(res.data.data);
    } catch (err) {
      console.error("refreshVariations error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVariations();
  }, []);

  return { variations, loading, refreshVariations };
}
