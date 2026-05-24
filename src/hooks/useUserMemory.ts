"use client";

import { useState, useEffect } from "react";

export interface RecentCollege {
  id: string;
  name: string;
  slug: string;
  nirf_rank: number | null;
  image_url: string | null;
  type?: string;
  location?: string;
}

export interface RecentComparison {
  college1: { id: string; name: string; slug?: string };
  college2: { id: string; name: string; slug?: string };
}

export interface PreviousPrediction {
  exam: string;
  rank: number;
  timestamp: number;
}

export interface ActivityLog {
  id: string;
  type: 'view' | 'compare' | 'predict' | 'save';
  text: string;
  timestamp: number;
  link?: string;
}

export interface UserMemoryState {
  recentSearches: string[];
  recentColleges: RecentCollege[];
  recentComparisons: RecentComparison[];
  preferredExams: string[];
  previousPredictions: PreviousPrediction[];
  savedColleges: RecentCollege[];
  recentActivity: ActivityLog[];
}

const DEFAULT_STATE: UserMemoryState = {
  recentSearches: [],
  recentColleges: [],
  recentComparisons: [],
  preferredExams: [],
  previousPredictions: [],
  savedColleges: [],
  recentActivity: [],
};

const MEMORY_KEY = "college_compass_memory_v2";

export function useUserMemory() {
  const [memory, setMemory] = useState<UserMemoryState>(DEFAULT_STATE);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(MEMORY_KEY);
      if (stored) {
        setMemory({ ...DEFAULT_STATE, ...JSON.parse(stored) });
      } else {
        // Migration from v1
        const oldStored = localStorage.getItem("college_compass_memory");
        if (oldStored) {
          const oldData = JSON.parse(oldStored);
          const migrated = { ...DEFAULT_STATE, ...oldData };
          setMemory(migrated);
          localStorage.setItem(MEMORY_KEY, JSON.stringify(migrated));
        }
      }
    } catch (e) {
      console.error("Failed to load user memory", e);
    }
    setIsLoaded(true);
  }, []);

  const saveMemory = (newState: UserMemoryState) => {
    setMemory(newState);
    if (typeof window !== "undefined") {
      localStorage.setItem(MEMORY_KEY, JSON.stringify(newState));
    }
  };

  const logActivity = (type: ActivityLog['type'], text: string, link?: string) => {
    setMemory(prev => {
      const newActivity: ActivityLog = {
        id: Math.random().toString(36).substr(2, 9),
        type,
        text,
        timestamp: Date.now(),
        link
      };
      const newState = {
        ...prev,
        recentActivity: [newActivity, ...prev.recentActivity].slice(0, 15)
      };
      localStorage.setItem(MEMORY_KEY, JSON.stringify(newState));
      return newState;
    });
  };

  const addRecentSearch = (query: string) => {
    if (!query.trim()) return;
    setMemory(prev => {
      const newState = {
        ...prev,
        recentSearches: [query, ...prev.recentSearches.filter((q) => q.toLowerCase() !== query.toLowerCase())].slice(0, 5),
      };
      localStorage.setItem(MEMORY_KEY, JSON.stringify(newState));
      return newState;
    });
  };

  const addRecentCollege = (college: RecentCollege) => {
    setMemory(prev => {
      const newState = {
        ...prev,
        recentColleges: [college, ...prev.recentColleges.filter((c) => c.id !== college.id)].slice(0, 10),
      };
      localStorage.setItem(MEMORY_KEY, JSON.stringify(newState));
      return newState;
    });
  };

  const toggleSavedCollege = (college: RecentCollege) => {
    setMemory(prev => {
      const isSaved = prev.savedColleges.some(c => c.id === college.id);
      let newSaved;
      if (isSaved) {
        newSaved = prev.savedColleges.filter(c => c.id !== college.id);
      } else {
        newSaved = [college, ...prev.savedColleges];
      }
      const newState = { ...prev, savedColleges: newSaved };
      
      if (!isSaved) {
        const newActivity: ActivityLog = {
          id: Math.random().toString(36).substr(2, 9),
          type: 'save',
          text: `Saved ${college.name} to shortlist`,
          timestamp: Date.now(),
          link: `/colleges/${college.slug}`
        };
        newState.recentActivity = [newActivity, ...newState.recentActivity].slice(0, 15);
      }
      
      localStorage.setItem(MEMORY_KEY, JSON.stringify(newState));
      return newState;
    });
  };

  const addRecentComparison = (comp: RecentComparison) => {
    setMemory(prev => {
      const newState = {
        ...prev,
        recentComparisons: [
          comp,
          ...prev.recentComparisons.filter(
            (c) =>
              !(c.college1.id === comp.college1.id && c.college2.id === comp.college2.id) &&
              !(c.college1.id === comp.college2.id && c.college2.id === comp.college1.id)
          ),
        ].slice(0, 3),
      };
      localStorage.setItem(MEMORY_KEY, JSON.stringify(newState));
      return newState;
    });
  };

  const addPreviousPrediction = (prediction: { exam: string, rank: number }) => {
    setMemory(prev => {
      const newPred: PreviousPrediction = { ...prediction, timestamp: Date.now() };
      
      const newExams = prev.preferredExams.includes(prediction.exam) 
        ? prev.preferredExams 
        : [prediction.exam, ...prev.preferredExams].slice(0, 3);
        
      const newState = {
        ...prev,
        preferredExams: newExams,
        previousPredictions: [
          newPred,
          ...prev.previousPredictions.filter(p => p.exam !== prediction.exam || p.rank !== prediction.rank)
        ].slice(0, 5)
      };
      localStorage.setItem(MEMORY_KEY, JSON.stringify(newState));
      return newState;
    });
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
    toggleSavedCollege,
    addPreviousPrediction,
    logActivity,
    clearMemory,
  };
}
