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
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            Market Overview
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Live cryptocurrency prices and market metrics.</p>
        </div>
        
        <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg w-full md:w-auto">
          <button
            onClick={() => setFilter('all')}
            className={`flex-1 md:flex-none px-6 py-2 rounded-md text-sm font-medium transition-all ${
              filter === 'all' 
                ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-sm' 
                : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-100'
            }`}
          >
            All Coins
          </button>
          <button
            onClick={() => setFilter('favorites')}
            className={`flex-1 md:flex-none px-6 py-2 rounded-md text-sm font-medium transition-all ${
              filter === 'favorites' 
                ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-sm' 
                : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-100'
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
