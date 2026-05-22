"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, MapPin, Loader2 } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";

interface Suggestion {
  id: string;
  name: string;
  slug: string;
  location: string;
  type: string;
}

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  const debouncedQuery = useDebounce(query, 300);
  const wrapperRef = useRef<HTMLDivElement>(null);

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

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div className="flex w-full items-center">
        <Search className="h-5 w-5 text-muted-foreground shrink-0" />
        <input 
          type="text" 
          placeholder="Search IITs, NITs, B-Schools..." 
          className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-muted-foreground text-sm ml-3 w-full"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
        />
        {isLoading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground ml-2" />}
      </div>

      {isOpen && query.length >= 2 && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#1a1a20] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
          {suggestions.map((suggestion) => (
            <Link 
              key={suggestion.id}
              href={`/colleges/${suggestion.slug}`}
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between p-3 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
            >
              <div>
                <p className="text-sm font-semibold text-white">{suggestion.name}</p>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                  <MapPin className="h-3 w-3" />
                  {suggestion.location}
                </div>
              </div>
              <span className="text-[9px] font-bold uppercase tracking-wider bg-white/5 px-2 py-1 rounded text-muted-foreground shrink-0">
                {suggestion.type}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
