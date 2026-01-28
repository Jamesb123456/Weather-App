import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils/cn';

interface LoadingSkeletonProps {
  className?: string;
}

export function CurrentWeatherSkeleton({ className }: LoadingSkeletonProps) {
  return (
    <div className={cn('p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20', className)}>
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
        <div className="flex flex-col items-center sm:items-start gap-3">
          <Skeleton className="h-6 w-48" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-24 w-24 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-16 w-32" />
              <Skeleton className="h-5 w-24" />
            </div>
          </div>
          <div className="flex items-center gap-4 mt-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function HourlyForecastSkeleton({ className }: LoadingSkeletonProps) {
  return (
    <div className={cn('p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20', className)}>
      <Skeleton className="h-6 w-40 mb-4" />
      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-2 min-w-[80px]">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-4 w-10" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function DailyForecastSkeleton({ className }: LoadingSkeletonProps) {
  return (
    <div className={cn('p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20', className)}>
      <Skeleton className="h-6 w-32 mb-4" />
      <div className="space-y-3">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-6 w-6 rounded-full" />
            </div>
            <div className="flex items-center gap-3">
              <Skeleton className="h-4 w-10" />
              <Skeleton className="h-1.5 w-20" />
              <Skeleton className="h-4 w-10" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function WeatherDetailsSkeleton({ className }: LoadingSkeletonProps) {
  return (
    <div className={cn('p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20', className)}>
      <Skeleton className="h-6 w-36 mb-4" />
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-5 w-12" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AirQualitySkeleton({ className }: LoadingSkeletonProps) {
  return (
    <div className={cn('p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20', className)}>
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-6 w-28" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-2 w-full rounded-full" />
        <div className="grid grid-cols-3 gap-2 mt-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center p-2 rounded-lg bg-white/5">
              <Skeleton className="h-3 w-10" />
              <Skeleton className="h-4 w-8 mt-1" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function MapSkeleton({ className }: LoadingSkeletonProps) {
  return (
    <div className={cn('rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 overflow-hidden', className)}>
      <div className="p-6 pb-2">
        <Skeleton className="h-6 w-32" />
      </div>
      <Skeleton className="h-[300px] sm:h-[400px] w-full rounded-none" />
    </div>
  );
}

export function FullPageSkeleton() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </div>
      
      <Skeleton className="h-10 w-full max-w-md rounded-full" />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <CurrentWeatherSkeleton />
          <HourlyForecastSkeleton />
          <DailyForecastSkeleton />
        </div>
        <div className="space-y-6">
          <WeatherDetailsSkeleton />
          <AirQualitySkeleton />
        </div>
      </div>
    </div>
  );
}
