"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, MapPin, Loader2, TrendingUp, Sparkles } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { motion, AnimatePresence } from "framer-motion";

interface Suggestion {
  id: string;
  name: string;
  slug: string;
  location: string;
  type: string;
}

const TRENDING = [
  { slug: "indian-institute-of-technology-madras", name: "IIT Madras" },
  { slug: "indian-institute-of-science", name: "IISc Bangalore" },
  { slug: "indian-institute-of-technology-delhi", name: "IIT Delhi" },
];

export function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  const debouncedQuery = useDebounce(query, 300);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function fetchSuggestions() {
      if (!debouncedQuery || debouncedQuery.length < 2) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        const res = await fetch(`/api/search/suggestions?q=${encodeURIComponent(debouncedQuery)}`);
        const json = await res.json();
        if (json.success) {
          setSuggestions(json.data);
          setSelectedIndex(-1);
        }
      } catch (err) {
        console.error("Failed to fetch suggestions", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSuggestions();
  }, [debouncedQuery]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    const listLength = debouncedQuery.length < 2 ? TRENDING.length : suggestions.length;
    
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % listLength);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 < 0 ? listLength - 1 : prev - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      setIsOpen(false);
      
      if (selectedIndex >= 0) {
        const targetSlug = debouncedQuery.length < 2 ? TRENDING[selectedIndex].slug : suggestions[selectedIndex].slug;
        router.push(`/colleges/${targetSlug}`);
      } else if (query.trim().length > 0) {
        router.push(`/colleges?search=${encodeURIComponent(query.trim())}`);
      }
    }
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div className="flex w-full items-center">
        <Search className="h-5 w-5 text-muted-foreground shrink-0" />
        <input 
          ref={inputRef}
          type="text" 
          placeholder="Search IITs, NITs, B-Schools..." 
          className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-muted-foreground text-sm ml-3 w-full"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setSelectedIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
        />
        {isLoading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground ml-2" />}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-0 right-0 mt-3 bg-[#09090b] border border-white/10 rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.8)] overflow-hidden z-50"
          >
            {debouncedQuery.length < 2 ? (
              // Trending State
              <div className="p-2">
                <div className="px-3 py-2 flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  <TrendingUp className="h-3.5 w-3.5" />
                  Trending Searches
                </div>
                {TRENDING.map((item, idx) => (
                  <Link 
                    key={item.slug}
                    href={`/colleges/${item.slug}`}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${selectedIndex === idx ? "bg-white/10" : "hover:bg-white/5"}`}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white/5 border border-white/10">
                      <Sparkles className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-white">{item.name}</span>
                  </Link>
                ))}
              </div>
            ) : suggestions.length > 0 ? (
              // Results State
              <div className="p-2">
                {suggestions.map((suggestion, idx) => (
                  <Link 
                    key={suggestion.id}
                    href={`/colleges/${suggestion.slug}`}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between p-3 rounded-lg transition-colors ${selectedIndex === idx ? "bg-white/10" : "hover:bg-white/5"}`}
                  >
                    <div>
                      <p className="text-sm font-semibold text-white">{suggestion.name}</p>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                        <MapPin className="h-3 w-3" />
                        {suggestion.location}
                      </div>
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-wider bg-white/5 px-2 py-1 rounded text-muted-foreground shrink-0 border border-white/10">
                      {suggestion.type}
                    </span>
                  </Link>
                ))}
              </div>
            ) : !isLoading ? (
              // No Results
              <div className="p-8 text-center text-sm text-muted-foreground">
                No colleges found matching "{debouncedQuery}"
              </div>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
