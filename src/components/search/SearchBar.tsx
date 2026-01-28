import { useState, useRef, useEffect, useCallback } from 'react';
import { Search, MapPin, X, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { searchCities, formatLocationName, geocodingResultToLocation } from '@/lib/api/geocoding';
import { cn } from '@/lib/utils/cn';
import type { GeocodingResult, Location } from '@/lib/api/types';

interface SearchBarProps {
  onLocationSelect: (location: Location) => void;
  onGetCurrentLocation: () => void;
  isGettingLocation?: boolean;
  className?: string;
}

export function SearchBar({
  onLocationSelect,
  onGetCurrentLocation,
  isGettingLocation,
  className,
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GeocodingResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const search = useCallback(async (searchQuery: string) => {
    if (searchQuery.trim().length < 2) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const data = await searchCities(searchQuery);
      setResults(data);
      setIsOpen(data.length > 0);
      setSelectedIndex(-1);
    } catch {
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      search(query);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query, search]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (result: GeocodingResult) => {
    const location = geocodingResultToLocation(result);
    onLocationSelect(location);
    setQuery('');
    setResults([]);
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < results.length) {
          handleSelect(results[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        inputRef.current?.blur();
        break;
    }
  };

  return (
    <div ref={containerRef} className={cn('relative w-full max-w-md', className)}>
      <div className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 pointer-events-none" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search city..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => results.length > 0 && setIsOpen(true)}
            onKeyDown={handleKeyDown}
            className="pl-10 pr-10"
            aria-label="Search for a city"
            aria-expanded={isOpen}
            aria-controls="search-results"
          />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                setResults([]);
                setIsOpen(false);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          {isLoading && (
            <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 animate-spin" />
          )}
        </div>

        <Button
          variant="glass"
          size="icon"
          onClick={onGetCurrentLocation}
          disabled={isGettingLocation}
          aria-label="Use current location"
        >
          {isGettingLocation ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <MapPin className="w-4 h-4" />
          )}
        </Button>
      </div>

      {isOpen && results.length > 0 && (
        <div
          id="search-results"
          className="absolute z-50 w-full mt-2 py-2 bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl shadow-lg overflow-hidden"
          role="listbox"
          aria-label="Search results"
        >
          {results.map((result, index) => (
            <button
              key={result.id}
              onClick={() => handleSelect(result)}
              onMouseEnter={() => setSelectedIndex(index)}
              className={cn(
                'w-full px-4 py-3 text-left flex items-center gap-3 transition-colors',
                index === selectedIndex ? 'bg-white/10' : 'hover:bg-white/5'
              )}
              role="option"
              aria-selected={index === selectedIndex ? true : false}
            >
              <MapPin className="w-4 h-4 text-white/50 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-white font-medium truncate">{result.name}</p>
                <p className="text-sm text-white/60 truncate">
                  {formatLocationName(result)}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
