import { createContext, useContext, useState, type ReactNode } from 'react';
import type { TemperatureUnit, Location, FavoriteCity } from '@/lib/api/types';
import { STORAGE_KEYS, DEFAULT_LOCATION } from '@/lib/constants';
import { getLocationId } from '@/lib/api/geocoding';

interface SettingsContextType {
  unit: TemperatureUnit;
  setUnit: (unit: TemperatureUnit) => void;
  toggleUnit: () => void;
  favorites: FavoriteCity[];
  addFavorite: (location: Location) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (location: Location) => boolean;
  currentLocation: Location;
  setCurrentLocation: (location: Location) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

function getStoredUnit(): TemperatureUnit {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEYS.unit);
    if (stored === 'celsius' || stored === 'fahrenheit') {
      return stored;
    }
  }
  return 'celsius';
}

function getStoredFavorites(): FavoriteCity[] {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.favorites);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      return [];
    }
  }
  return [];
}

function getStoredLocation(): Location {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.lastLocation);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      return DEFAULT_LOCATION;
    }
  }
  return DEFAULT_LOCATION;
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [unit, setUnitState] = useState<TemperatureUnit>(() => getStoredUnit());
  const [favorites, setFavorites] = useState<FavoriteCity[]>(() => getStoredFavorites());
  const [currentLocation, setCurrentLocationState] = useState<Location>(() => getStoredLocation());

  const setUnit = (newUnit: TemperatureUnit) => {
    setUnitState(newUnit);
    localStorage.setItem(STORAGE_KEYS.unit, newUnit);
  };

  const toggleUnit = () => {
    const newUnit = unit === 'celsius' ? 'fahrenheit' : 'celsius';
    setUnit(newUnit);
  };

  const addFavorite = (location: Location) => {
    const id = getLocationId(location);
    if (favorites.some((f) => f.id === id)) return;

    const newFavorite: FavoriteCity = {
      id,
      name: location.name,
      latitude: location.latitude,
      longitude: location.longitude,
      country: location.country,
      admin1: location.admin1,
    };

    const newFavorites = [...favorites, newFavorite];
    setFavorites(newFavorites);
    localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(newFavorites));
  };

  const removeFavorite = (id: string) => {
    const newFavorites = favorites.filter((f) => f.id !== id);
    setFavorites(newFavorites);
    localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(newFavorites));
  };

  const isFavorite = (location: Location) => {
    const id = getLocationId(location);
    return favorites.some((f) => f.id === id);
  };

  const setCurrentLocation = (location: Location) => {
    setCurrentLocationState(location);
    localStorage.setItem(STORAGE_KEYS.lastLocation, JSON.stringify(location));
  };

  return (
    <SettingsContext.Provider
      value={{
        unit,
        setUnit,
        toggleUnit,
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        currentLocation,
        setCurrentLocation,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
