import { useState, useEffect, useRef, useCallback } from 'react';
import { IconSearch, IconMapPin, IconLoader2 } from '@tabler/icons-react';
import type { GeocodingResult } from '../types/weather';
import { searchCities } from '../api/geocoding';
import './SearchBar.css';

interface Props {
  onSelect: (location: GeocodingResult) => void;
  selectedLocation: GeocodingResult | null;
}

export function SearchBar({ onSelect, selectedLocation }: Props) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GeocodingResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const doSearch = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }
    setIsSearching(true);
    try {
      const data = await searchCities(q);
      setResults(data);
      setIsOpen(data.length > 0);
      setActiveIndex(-1);
    } catch {
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => doSearch(query), 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, doSearch]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function handleSelect(result: GeocodingResult) {
    onSelect(result);
    setQuery('');
    setIsOpen(false);
    setResults([]);
    inputRef.current?.blur();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!isOpen) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(i => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(i => Math.max(i - 1, -1));
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      handleSelect(results[activeIndex]);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  }

  function getLocationLabel(r: GeocodingResult) {
    const parts = [r.admin1, r.country].filter(Boolean);
    return parts.join(', ');
  }

  return (
    <div className="search-bar" ref={containerRef}>
      <div className="search-input-wrap">
        <span className="search-icon">
          {isSearching
            ? <IconLoader2 size={16} stroke={1.5} className="search-spinner" />
            : <IconSearch size={16} stroke={1.5} />
          }
        </span>
        <input
          ref={inputRef}
          type="text"
          className="search-input"
          placeholder={selectedLocation ? selectedLocation.name : 'Search city…'}
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => results.length > 0 && setIsOpen(true)}
          autoComplete="off"
          spellCheck={false}
        />
      </div>

      {isOpen && results.length > 0 && (
        <ul className="search-dropdown" role="listbox">
          {results.map((r, i) => (
            <li
              key={r.id}
              className={`search-option${i === activeIndex ? ' search-option--active' : ''}`}
              role="option"
              aria-selected={i === activeIndex}
              onMouseDown={() => handleSelect(r)}
              onMouseEnter={() => setActiveIndex(i)}
            >
              <IconMapPin size={14} stroke={1.5} className="search-option-icon" />
              <span className="search-option-name">{r.name}</span>
              <span className="search-option-sub">{getLocationLabel(r)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
