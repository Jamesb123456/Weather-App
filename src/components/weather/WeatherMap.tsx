import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Map, Layers, Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { MAP_CONFIG, RAINVIEWER_API_URL } from '@/lib/constants';
import 'leaflet/dist/leaflet.css';

interface WeatherMapProps {
  latitude: number;
  longitude: number;
  className?: string;
}

interface RainViewerData {
  radar: {
    past: { path: string; time: number }[];
    nowcast: { path: string; time: number }[];
  };
  host: string;
}

function MapController({ latitude, longitude }: { latitude: number; longitude: number }) {
  const map = useMap();

  useEffect(() => {
    map.setView([latitude, longitude], MAP_CONFIG.defaultZoom);
  }, [map, latitude, longitude]);

  return null;
}

function MapControls() {
  const map = useMap();

  return (
    <div className="absolute bottom-4 right-4 z-[1000] flex flex-col gap-2">
      <Button
        variant="glass"
        size="icon"
        className="h-8 w-8"
        onClick={() => map.zoomIn()}
        aria-label="Zoom in"
      >
        <Plus className="w-4 h-4" />
      </Button>
      <Button
        variant="glass"
        size="icon"
        className="h-8 w-8"
        onClick={() => map.zoomOut()}
        aria-label="Zoom out"
      >
        <Minus className="w-4 h-4" />
      </Button>
    </div>
  );
}

export function WeatherMap({ latitude, longitude, className }: WeatherMapProps) {
  const [radarData, setRadarData] = useState<RainViewerData | null>(null);
  const [showRadar, setShowRadar] = useState(true);

  useEffect(() => {
    async function fetchRadarData() {
      try {
        const response = await fetch(RAINVIEWER_API_URL);
        if (response.ok) {
          const data = await response.json();
          setRadarData(data);
        }
      } catch {
        // Radar data fetch failed silently
      }
    }

    fetchRadarData();
    const interval = setInterval(fetchRadarData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const latestRadar = radarData?.radar.past.slice(-1)[0];
  const radarTileUrl = latestRadar
    ? `${radarData?.host}${latestRadar.path}/256/{z}/{x}/{y}/2/1_1.png`
    : null;

  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Map className="w-5 h-5" />
            Weather Radar
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 gap-2"
            onClick={() => setShowRadar(!showRadar)}
          >
            <Layers className="w-4 h-4" />
            {showRadar ? 'Hide' : 'Show'} Radar
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative h-[300px] sm:h-[400px]">
          <MapContainer
            center={[latitude, longitude]}
            zoom={MAP_CONFIG.defaultZoom}
            minZoom={MAP_CONFIG.minZoom}
            maxZoom={MAP_CONFIG.maxZoom}
            className="w-full h-full z-0"
            zoomControl={false}
            attributionControl={false}
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            {showRadar && radarTileUrl && (
              <TileLayer
                url={radarTileUrl}
                opacity={0.6}
              />
            )}
            <MapController latitude={latitude} longitude={longitude} />
            <MapControls />
          </MapContainer>

          <div className="absolute bottom-4 left-4 z-[1000] bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2 text-xs text-white/80">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span>Light</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <span>Moderate</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span>Heavy</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
