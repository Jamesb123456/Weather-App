import { useSettings } from '@/context/SettingsContext';
import type { Location } from '@/lib/api/types';

export function useFavorites() {
  const { favorites, addFavorite, removeFavorite, isFavorite } = useSettings();

  const toggleFavorite = (location: Location) => {
    if (isFavorite(location)) {
      const id = `${location.latitude.toFixed(4)}_${location.longitude.toFixed(4)}`;
      removeFavorite(id);
    } else {
      addFavorite(location);
    }
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
  };
}
