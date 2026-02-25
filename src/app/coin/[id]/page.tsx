'use client';

import { useState, useEffect, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Star, TrendingUp, DollarSign, Activity } from 'lucide-react';
import { useCoinData } from '@/hooks/useCoinData';
import { useFavoriteStore } from '@/store/favorite.store';
import { PriceChart } from '@/components/crypto/PriceChart';
import { Loader } from '@/components/common/Loader';
import { formatCurrency, formatPercentage } from '@/utils/formatters';

export default function CoinDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  
  const { data: coin, isLoading, isError } = useCoinData(id);
  const { toggleFavorite, isFavorite } = useFavoriteStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader size={40} />
      </div>
    );
  }

  if (isError || !coin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <p className="text-red-500 font-medium">Failed to load coin details.</p>
        <Link href="/" className="text-blue-500 hover:underline">Return to Home</Link>
      </div>
    );
  }

  const isFav = mounted ? isFavorite(coin.id) : false;
  const isPositive = coin.market_data.price_change_percentage_24h > 0;

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:hover:text-gray-300 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Markets
      </Link>

      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 lg:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div className="flex items-center gap-4">
            <Image src={coin.image.large} alt={coin.name} width={64} height={64} className="rounded-full" />
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{coin.name}</h1>
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded text-xs font-bold uppercase">
                  {coin.symbol}
                </span>
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded text-xs font-bold">
                  Rank #{coin.market_cap_rank}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(coin.market_data.current_price.usd)}
              </p>
              <p className={`text-sm font-medium flex items-center justify-end gap-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {isPositive ? '↗' : '↘'} {formatPercentage(Math.abs(coin.market_data.price_change_percentage_24h))}
              </p>
            </div>
            <button
              onClick={() => toggleFavorite(coin.id)}
              className="p-3 bg-gray-50 dark:bg-gray-800 hover:bg-yellow-50 dark:hover:bg-gray-700 rounded-xl transition-colors"
            >
              <Star className={`w-6 h-6 ${isFav ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <DollarSign className="w-4 h-4" /> Market Cap
            </div>
            <p className="font-semibold">{formatCurrency(coin.market_data.market_cap.usd)}</p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <Activity className="w-4 h-4" /> 24h Volume
            </div>
            <p className="font-semibold">{formatCurrency(coin.market_data.total_volume.usd)}</p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <TrendingUp className="w-4 h-4" /> 24h High
            </div>
            <p className="font-semibold">{formatCurrency(coin.market_data.high_24h.usd)}</p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <TrendingUp className="w-4 h-4 rotate-180" /> 24h Low
            </div>
            <p className="font-semibold">{formatCurrency(coin.market_data.low_24h.usd)}</p>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-bold mb-4">Price Chart (24h)</h3>
          <PriceChart coinId={coin.id} days="1" />
        </div>
      </div>
    </div>
  );
}
