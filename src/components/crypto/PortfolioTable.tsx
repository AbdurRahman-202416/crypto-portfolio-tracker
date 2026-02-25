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
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Total Balance</h2>
          <p className="text-4xl font-bold text-gray-900 dark:text-white">
            {formatCurrency(currentTotal)}
          </p>
        </div>
        <Button variant="danger" size="sm" onClick={clearPortfolio}>
          Clear All
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800 text-xs uppercase text-gray-500 dark:text-gray-400">
                <th className="px-6 py-4 font-medium">Asset</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium text-right">Holdings</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {items.map((item) => {
                const coinData = marketData?.find(c => c.id === item.coinId);
                const currentPrice = coinData?.current_price ?? 0;
                const value = currentPrice * item.quantity;
                const percentChange = coinData?.price_change_percentage_24h ?? 0;
                
                return (
                  <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-colors">
                    <td className="px-6 py-4">
                      <Link href={`/coin/${item.coinId}`} className="flex items-center gap-3">
                        <Image src={item.image} alt={item.name} width={32} height={32} className="rounded-full" />
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-gray-100">{item.name}</p>
                          <p className="text-xs text-gray-500 uppercase">{item.symbol}</p>
                        </div>
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900 dark:text-gray-100">{formatCurrency(currentPrice)}</p>
                      <p className={`text-xs ${percentChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {percentChange >= 0 ? '+' : ''}{formatPercentage(percentChange)}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <p className="font-semibold text-gray-900 dark:text-gray-100">{formatCurrency(value)}</p>
                      <p className="text-xs text-gray-500">{item.quantity} {item.symbol.toUpperCase()}</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
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
