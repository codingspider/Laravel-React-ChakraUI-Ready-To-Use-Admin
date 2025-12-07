// hooks/useVariations.js

import { useState, useEffect } from "react";
import { db } from "../db";
import api from "../axios";
import { GET_BRANCH_VARIATIONS } from "../routes/apiRoutes";

export function useVariations() {
  const [variations, setVariations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch with relation building
  const loadLocal = async () => {
    const savedVariations = await db.variations.toArray();

    if (savedVariations.length === 0) return null;

    const withChildren = [];

    for (const v of savedVariations) {
      const items = await db.variation_items
        .where("variation_id")
        .equals(v.id)
        .toArray();

      withChildren.push({ ...v, variation_items: items });
    }

    return withChildren;
  };

  const saveToLocal = async (data) => {
    await db.variations.clear();
    await db.variation_items.clear();

    for (const v of data) {
      await db.variations.put({
        id: v.id,
        branch_id: v.branch_id,
        name: v.name
      });

      for (const item of v.variation_items) {
        await db.variation_items.put({
          id: item.id,
          variation_id: v.id,
          name: item.name,
          price: item.price
        });
      }
    }
  };

  const fetchVariations = async () => {
    setLoading(true);

    try {
      /**
       * 1) check local first
       */
      const localData = await loadLocal();
      if (localData) {
        setVariations(localData);
        setLoading(false);
        return;
      }

      /**
       * 2) Otherwise fetch from API
       */
      const res = await api.get(GET_BRANCH_VARIATIONS);
      const serverData = res.data.data;

      console.log(serverData);

      setVariations(serverData);
      await saveToLocal(serverData);
    } catch (error) {
      console.error("fetchVariations error:", error);
    }

    setLoading(false);
  };

  const refreshVariations = async () => {
    setLoading(true);

    try {
      const res = await api.get(GET_BRANCH_VARIATIONS);
      const serverData = res.data.data;

      setVariations(serverData);
      await saveToLocal(serverData);
    } catch (error) {
      console.error("refreshVariations error:", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchVariations();
  }, []);

  return { variations, loading, refreshVariations };
}
