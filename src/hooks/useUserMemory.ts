"use client";

import { useState, useEffect } from "react";

interface RecentCollege {
  id: string;
  name: string;
  slug: string;
  nirf_rank: number | null;
  image_url: string | null;
}

interface RecentComparison {
  college1: { id: string; name: string };
  college2: { id: string; name: string };
}

interface UserMemoryState {
  recentSearches: string[];
  recentColleges: RecentCollege[];
  recentComparisons: RecentComparison[];
}

const DEFAULT_STATE: UserMemoryState = {
  recentSearches: [],
  recentColleges: [],
  recentComparisons: [],
};

export function useUserMemory() {
  const [memory, setMemory] = useState<UserMemoryState>(DEFAULT_STATE);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("college_compass_memory");
      if (stored) {
        setMemory(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load user memory", e);
    }
    setIsLoaded(true);
  }, []);

  const saveMemory = (newState: UserMemoryState) => {
    setMemory(newState);
    localStorage.setItem("college_compass_memory", JSON.stringify(newState));
  };

  const addRecentSearch = (query: string) => {
    if (!query.trim()) return;
    const newState = {
      ...memory,
      recentSearches: [
        query,
        ...memory.recentSearches.filter((q) => q.toLowerCase() !== query.toLowerCase()),
      ].slice(0, 5),
    };
    saveMemory(newState);
  };

  const addRecentCollege = (college: RecentCollege) => {
    const newState = {
      ...memory,
      recentColleges: [
        college,
        ...memory.recentColleges.filter((c) => c.id !== college.id),
      ].slice(0, 4),
    };
    saveMemory(newState);
  };

  const addRecentComparison = (comp: RecentComparison) => {
    const newState = {
      ...memory,
      recentComparisons: [
        comp,
        ...memory.recentComparisons.filter(
          (c) =>
            !(c.college1.id === comp.college1.id && c.college2.id === comp.college2.id) &&
            !(c.college1.id === comp.college2.id && c.college2.id === comp.college1.id)
        ),
      ].slice(0, 3),
    };
    saveMemory(newState);
  };

  const clearMemory = () => {
    saveMemory(DEFAULT_STATE);
  };

  return {
    ...memory,
    isLoaded,
    addRecentSearch,
    addRecentCollege,
    addRecentComparison,
    clearMemory,
  };
}
