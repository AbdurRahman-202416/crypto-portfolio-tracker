import Link from 'next/link';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { MarketData } from '../../types';
import { useFavoriteStore } from '../../store/favorite.store';
import { formatCurrency, formatPercentage } from '../../utils/formatters';

interface CoinCardProps {
  coin: MarketData;
}

export const CoinCard = ({ coin }: CoinCardProps) => {
  const { toggleFavorite, isFavorite } = useFavoriteStore();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const isFav = mounted ? isFavorite(coin.id) : false;

  const isPositive = coin.price_change_percentage_24h > 0;

  return (
    <div className="glass-card rounded-2xl p-5 hover:shadow-2xl hover:shadow-primary/10 dark:hover:shadow-primary/10 transition-all duration-500 transform hover:-translate-y-2 group relative overflow-hidden">
      {/* Decorative gradient overlay on hover */}
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <Link href={`/coin/${coin.id}`} className="flex items-center gap-4">
            <div className="relative w-12 h-12 bg-white dark:bg-gray-800 rounded-full p-2 shadow-sm group-hover:scale-110 transition-transform duration-500">
              <Image src={coin.image} alt={coin.name} fill className="object-cover rounded-full p-1" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 group-hover:text-primary dark:group-hover:text-primary-light transition-colors line-clamp-1">
                {coin.name}
              </h3>
              <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full inline-block mt-1">
                {coin.symbol}
              </span>
            </div>
          </Link>
          <button
            onClick={() => toggleFavorite(coin.id)}
            className={`p-2 rounded-xl transition-all duration-300 hover:scale-110 ${
              isFav 
                ? 'bg-yellow-50 dark:bg-yellow-500/10 text-yellow-400' 
                : 'bg-gray-50 dark:bg-gray-800/50 text-gray-400 hover:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-500/10'
            }`}
            aria-label="Toggle favorite"
          >
            <Star className={`w-5 h-5 ${isFav ? 'fill-yellow-400 text-yellow-500' : ''}`} />
          </button>
        </div>

        <div className="flex justify-between items-end mt-2">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 font-medium">Price</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              {formatCurrency(coin.current_price)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 font-medium">24h Change</p>
            <div className={`px-2.5 py-1 rounded-lg text-sm font-bold flex items-center justify-end gap-1 ${
              isPositive 
                ? 'bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400' 
                : 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400'
            }`}>
              {isPositive ? '↑' : '↓'} {formatPercentage(Math.abs(coin.price_change_percentage_24h))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
