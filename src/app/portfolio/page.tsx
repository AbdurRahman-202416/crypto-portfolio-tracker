'use client';

import { useState } from 'react';
import { PortfolioTable } from '@/components/crypto/PortfolioTable';
import { Button } from '@/components/common/Button';
import { usePortfolioStore } from '@/store/portfolio.store';
import { useMarketData } from '@/hooks/useMarketData';
import { Loader } from '@/components/common/Loader';

export default function PortfolioPage() {
  const { addItem } = usePortfolioStore();
  const { data: marketData, isLoading } = useMarketData(1, 250);
  const [selectedCoin, setSelectedCoin] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCoin || !marketData) return;
    
    const coin = marketData.find(c => c.id === selectedCoin);
    if (!coin) return;

    addItem({
      coinId: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      image: coin.image,
      quantity: parseFloat(quantity)
    });

    setSelectedCoin('');
    setQuantity('');
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
          Your Portfolio
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Manage and track your crypto investments</p>
      </div>

      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Add Asset</h2>
        <form onSubmit={handleAdd} className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 w-full relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select Coin</label>
            <select
              value={selectedCoin}
              onChange={(e) => setSelectedCoin(e.target.value)}
              className="w-full h-10 px-3 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none"
              required
            >
              <option value="" disabled>Select a coin...</option>
              {marketData?.map(coin => (
                <option key={coin.id} value={coin.id}>{coin.name} ({coin.symbol.toUpperCase()})</option>
              ))}
            </select>
            {isLoading && (
              <div className="absolute right-3 top-[34px]">
                <Loader size={16} />
              </div>
            )}
          </div>
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Quantity</label>
            <input
              type="number"
              step="any"
              min="0"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="0.00"
              className="w-full h-10 px-3 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              required
            />
          </div>
          <Button type="submit" disabled={!selectedCoin || !quantity} className="w-full md:w-auto h-10 px-8">
            Add to Portfolio
          </Button>
        </form>
      </div>

      <PortfolioTable />
    </div>
  );
}
