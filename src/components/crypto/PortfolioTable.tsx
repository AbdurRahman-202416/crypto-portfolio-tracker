import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { usePortfolioStore } from '../../store/portfolio.store';
import { useMarketData } from '../../hooks/useMarketData';
import { formatCurrency, formatPercentage } from '../../utils/formatters';
import { Button } from '../common/Button';
import { Loader } from '../common/Loader';

export const PortfolioTable = () => {
  const { items, removeItem, clearPortfolio } = usePortfolioStore();
  const { data: marketData, isLoading } = useMarketData(1, 250);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader size={32} />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-16 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl">
        <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">Portfolio is empty</h3>
        <p className="text-gray-500 mb-6">Start tracking your crypto assets by adding some coins.</p>
        <Link href="/">
          <Button>Browse Markets</Button>
        </Link>
      </div>
    );
  }

  const currentTotal = items.reduce((acc, item) => {
    const coinData = marketData?.find(c => c.id === item.coinId);
    if (!coinData) return acc;
    return acc + (coinData.current_price * item.quantity);
  }, 0);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 p-6 glass-card rounded-3xl relative overflow-hidden">
        {/* Decorative total balance background */}
        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10">
          <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Total Balance
          </h2>
          <p className="text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            {formatCurrency(currentTotal)}
          </p>
        </div>
        <Button variant="danger" size="sm" onClick={clearPortfolio} className="relative z-10 rounded-xl px-6 font-bold shadow-lg shadow-red-500/20 hover:shadow-red-500/40 transition-all hover:-translate-y-0.5">
          <Trash2 className="w-4 h-4 mr-2 inline" /> Clear All
        </Button>
      </div>

      <div className="glass-card rounded-3xl overflow-hidden shadow-xl shadow-gray-200/20 dark:shadow-black/40">
        {/* Mobile View (Cards) */}
        <div className="block md:hidden divide-y divide-gray-100 dark:divide-gray-800">
          {items.map((item) => {
            const coinData = marketData?.find(c => c.id === item.coinId);
            const currentPrice = coinData?.current_price ?? 0;
            const value = currentPrice * item.quantity;
            const percentChange = coinData?.price_change_percentage_24h ?? 0;
            const isPositive = percentChange >= 0;

            return (
              <div key={item.id} className="p-5 flex flex-col gap-4 bg-white/50 dark:bg-gray-900/50 hover:bg-white dark:hover:bg-gray-800 transition-colors">
                <div className="flex justify-between items-start">
                  <Link href={`/coin/${item.coinId}`} className="flex items-center gap-3">
                    <div className="bg-white dark:bg-gray-800 p-1.5 rounded-xl shadow-sm">
                      <Image src={item.image} alt={item.name} width={36} height={36} className="rounded-lg" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-gray-100 text-lg">{item.name}</p>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{item.symbol}</p>
                    </div>
                  </Link>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex justify-between items-end bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl">
                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-1">Price</p>
                    <p className="font-bold text-gray-900 dark:text-gray-100">{formatCurrency(currentPrice)}</p>
                    <p className={`text-xs font-bold mt-1 inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md ${isPositive ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'}`}>
                      {isPositive ? '↑' : '↓'}{formatPercentage(Math.abs(percentChange))}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-gray-500 mb-1">Holdings</p>
                    <p className="font-bold text-gray-900 dark:text-gray-100 text-lg">{formatCurrency(value)}</p>
                    <p className="text-xs font-bold text-gray-500 uppercase">{item.quantity} {item.symbol}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop View (Table) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-800 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 backdrop-blur-md">
                <th className="px-6 py-5">Asset</th>
                <th className="px-6 py-5">Price</th>
                <th className="px-6 py-5 text-right">Holdings</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800 bg-white/40 dark:bg-gray-900/40">
              {items.map((item) => {
                const coinData = marketData?.find(c => c.id === item.coinId);
                const currentPrice = coinData?.current_price ?? 0;
                const value = currentPrice * item.quantity;
                const percentChange = coinData?.price_change_percentage_24h ?? 0;
                const isPositive = percentChange >= 0;
                
                return (
                  <tr key={item.id} className="hover:bg-white dark:hover:bg-gray-800/80 transition-all duration-300 group">
                    <td className="px-6 py-5">
                      <Link href={`/coin/${item.coinId}`} className="flex items-center gap-4">
                        <div className="bg-white dark:bg-gray-800 p-2 rounded-2xl shadow-sm group-hover:scale-110 transition-transform duration-300">
                          <Image src={item.image} alt={item.name} width={36} height={36} className="rounded-xl" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 dark:text-gray-100 text-base group-hover:text-primary dark:group-hover:text-primary-light transition-colors">{item.name}</p>
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{item.symbol}</p>
                        </div>
                      </Link>
                    </td>
                    <td className="px-6 py-5">
                      <p className="font-bold text-gray-900 dark:text-gray-100 text-base">{formatCurrency(currentPrice)}</p>
                      <p className={`text-xs font-bold mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-md ${isPositive ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'}`}>
                        {isPositive ? '↑' : '↓'}{formatPercentage(Math.abs(percentChange))}
                      </p>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <p className="font-bold text-gray-900 dark:text-gray-100 text-lg">{formatCurrency(value)}</p>
                      <p className="text-xs font-bold text-gray-500 uppercase mt-1">{item.quantity} {item.symbol}</p>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all hover:scale-110 group-hover:opacity-100 opacity-60"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
