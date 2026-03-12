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
        <Link href="/" className="text-indigo-500 hover:underline">Return to Home</Link>
      </div>
    );
  }

  const isFav = mounted ? isFavorite(coin.id) : false;
  const isPositive = coin.market_data.price_change_percentage_24h > 0;

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">
      <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary dark:hover:text-primary-light transition-colors group font-medium">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Markets
      </Link>

      <div className="glass-card rounded-3xl p-6 lg:p-10 relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-10 relative z-10">
          <div className="flex items-center gap-6">
            <div className="relative w-20 h-20 bg-white dark:bg-gray-800 rounded-2xl p-3 shadow-xl shadow-primary/10 rotate-3">
              <Image src={coin.image.large} alt={coin.name} fill sizes="80px" className="object-cover rounded-2xl p-2 -rotate-3" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">{coin.name}</h1>
                <span className="px-3 py-1 bg-primary/10 text-primary dark:text-primary-light rounded-lg text-sm font-bold uppercase tracking-wider">
                  {coin.symbol}
                </span>
              </div>
              <span className="inline-flex items-center px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-md text-sm font-bold">
                Rank #{coin.market_cap_rank}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-6 bg-white/50 dark:bg-gray-800/50 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm backdrop-blur-sm">
            <div className="text-right">
              <p className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                {formatCurrency(coin.market_data.current_price.usd)}
              </p>
              <p className={`text-sm font-bold flex items-center justify-end gap-1 mt-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {isPositive ? '↑' : '↓'} {formatPercentage(Math.abs(coin.market_data.price_change_percentage_24h))}
              </p>
            </div>
            <div className="h-12 w-px bg-gray-200 dark:bg-gray-700 hidden sm:block"></div>
            <button
              onClick={() => toggleFavorite(coin.id)}
              className={`p-4 rounded-xl transition-all duration-300 hover:scale-110 shadow-sm ${
                isFav 
                  ? 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-500' 
                  : 'bg-white dark:bg-gray-700 text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-500/10'
              }`}
            >
              <Star className={`w-8 h-8 ${isFav ? 'fill-yellow-500 text-yellow-500' : ''}`} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-10 relative z-10">
          <div className="p-5 glass rounded-2xl hover:-translate-y-1 transition-transform duration-300">
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2 font-medium">
              <span className="p-1.5 bg-primary/10 rounded-lg text-primary"><DollarSign className="w-4 h-4" /></span> Market Cap
            </div>
            <p className="text-xl font-bold text-gray-900 dark:text-white">{formatCurrency(coin.market_data.market_cap.usd)}</p>
          </div>
          <div className="p-5 glass rounded-2xl hover:-translate-y-1 transition-transform duration-300">
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2 font-medium">
              <span className="p-1.5 bg-primary/10 rounded-lg text-primary-light"><Activity className="w-4 h-4" /></span> 24h Volume
            </div>
            <p className="text-xl font-bold text-gray-900 dark:text-white">{formatCurrency(coin.market_data.total_volume.usd)}</p>
          </div>
          <div className="p-5 glass rounded-2xl hover:-translate-y-1 transition-transform duration-300">
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2 font-medium">
              <span className="p-1.5 bg-green-50 dark:bg-green-500/10 rounded-lg text-green-500"><TrendingUp className="w-4 h-4" /></span> 24h High
            </div>
            <p className="text-xl font-bold text-gray-900 dark:text-white">{formatCurrency(coin.market_data.high_24h.usd)}</p>
          </div>
          <div className="p-5 glass rounded-2xl hover:-translate-y-1 transition-transform duration-300">
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2 font-medium">
              <span className="p-1.5 bg-red-50 dark:bg-red-500/10 rounded-lg text-red-500"><TrendingUp className="w-4 h-4 rotate-180" /></span> 24h Low
            </div>
            <p className="text-xl font-bold text-gray-900 dark:text-white">{formatCurrency(coin.market_data.low_24h.usd)}</p>
          </div>
        </div>

        <div className="glass p-6 rounded-2xl relative z-10">
          <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
            <span className="w-2 h-6 bg-primary rounded-full"></span> Price Chart (24h)
          </h3>
          <PriceChart coinId={coin.id} days="1" />
        </div>
      </div>
    </div>
  );
}
