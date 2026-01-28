import { Star, X, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useFavorites } from '@/hooks/useFavorites';
import { cn } from '@/lib/utils/cn';
import type { Location, FavoriteCity } from '@/lib/api/types';

interface FavoriteCitiesProps {
  onCitySelect: (location: Location) => void;
  className?: string;
}

export function FavoriteCities({ onCitySelect, className }: FavoriteCitiesProps) {
  const { favorites, removeFavorite } = useFavorites();

  if (favorites.length === 0) {
    return null;
  }

  const handleSelect = (city: FavoriteCity) => {
    onCitySelect({
      name: city.name,
      latitude: city.latitude,
      longitude: city.longitude,
      country: city.country,
      admin1: city.admin1,
    });
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          Favorite Cities
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {favorites.map((city) => (
            <div
              key={city.id}
              className={cn(
                'group flex items-center gap-2 px-3 py-2 rounded-full',
                'bg-white/10 hover:bg-white/20 transition-colors cursor-pointer'
              )}
            >
              <button
                onClick={() => handleSelect(city)}
                className="flex items-center gap-2"
              >
                <MapPin className="w-3 h-3 text-white/60" />
                <span className="text-sm text-white font-medium">{city.name}</span>
                {city.country && (
                  <span className="text-xs text-white/50">{city.country}</span>
                )}
              </button>
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFavorite(city.id);
                }}
                aria-label={`Remove ${city.name} from favorites`}
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
