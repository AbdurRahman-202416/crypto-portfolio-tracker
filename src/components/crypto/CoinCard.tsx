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
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-5 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex justify-between items-start mb-4">
        <Link href={`/coin/${coin.id}`} className="flex items-center gap-3 group">
          <div className="relative w-10 h-10">
            <Image src={coin.image} alt={coin.name} fill className="object-cover rounded-full" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-500 transition-colors">
              {coin.name}
            </h3>
            <span className="text-xs font-medium text-gray-500 uppercase">{coin.symbol}</span>
          </div>
        </Link>
        <button
          onClick={() => toggleFavorite(coin.id)}
          className="text-gray-400 hover:text-yellow-400 transition-colors"
          aria-label="Toggle favorite"
        >
          <Star className={`w-5 h-5 ${isFav ? 'fill-yellow-400 text-yellow-400' : ''}`} />
        </button>
      </div>

      <div className="flex justify-between items-end mt-4">
        <div>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-50">
            {formatCurrency(coin.current_price)}
          </p>
          <p className={`text-sm font-medium flex items-center gap-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {isPositive ? '↗' : '↘'} {formatPercentage(Math.abs(coin.price_change_percentage_24h))}
          </p>
        </div>
      </div>
    </div>
  );
};
