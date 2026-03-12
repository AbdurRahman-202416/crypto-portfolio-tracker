'use client';

import { useState } from 'react';
import { useMarketData } from '@/hooks/useMarketData';
import { useFavoriteStore } from '@/store/favorite.store';
import { CoinCard } from '@/components/crypto/CoinCard';
import { Skeleton } from '@/components/common/Skeleton';

export default function Home() {
  const [filter, setFilter] = useState<'all' | 'favorites'>('all');
  const { data, isLoading, isError, refetch } = useMarketData(1, 100);
  const { isFavorite } = useFavoriteStore();

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <p className="text-red-500 font-medium">Failed to fetch market data.</p>
        <button 
          onClick={() => refetch()} 
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  const filteredData = data?.filter(coin => filter === 'all' || isFavorite(coin.id)) || [];

  return (
    <div className="space-y-10 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary dark:text-primary-light text-sm font-medium mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary dark:bg-primary-light opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary dark:bg-primary-light"></span>
            </span>
            Live Updates
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gradient mb-2 tracking-tight">
            Market Overview
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-md">Real-time cryptocurrency prices, volumes, and market metrics.</p>
        </div>
        
        <div className="flex glass-card p-1 rounded-xl w-full md:w-auto relative z-10">
          <button
            onClick={() => setFilter('all')}
            className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
              filter === 'all' 
                ? 'bg-primary dark:bg-primary-light text-white shadow-md shadow-primary/20' 
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            All Coins
          </button>
          <button
            onClick={() => setFilter('favorites')}
            className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
              filter === 'favorites' 
                ? 'bg-primary dark:bg-primary-light text-white shadow-md shadow-primary/20' 
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            Favorites
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i} className="h-40 w-full rounded-xl" />
          ))}
        </div>
      ) : filteredData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredData.map((coin) => (
            <CoinCard key={coin.id} coin={coin} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-800">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">No coins found</h3>
          <p className="text-gray-500 mt-2">
            {filter === 'favorites' ? "You haven't added any favorites yet." : "Could not load data."}
          </p>
        </div>
      )}
    </div>
  );
}
