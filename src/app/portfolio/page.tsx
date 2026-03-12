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
    <div className="space-y-10 max-w-7xl mx-auto animate-in fade-in duration-500 pb-12">
      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary dark:text-primary-light text-sm font-medium mb-4">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary dark:bg-primary-light"></span>
          </span>
          Your Assets
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gradient mb-2 tracking-tight">
          Portfolio Tracker
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg max-w-md">Manage and track your crypto investments in real-time.</p>
      </div>

      <div className="glass-card p-6 lg:p-8 rounded-3xl relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
        
        <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white relative z-10 flex items-center gap-2">
          <span className="w-2 h-6 bg-primary rounded-full"></span> Add Asset
        </h2>
        <form onSubmit={handleAdd} className="flex flex-col md:flex-row gap-5 items-end relative z-10">
          <div className="flex-1 w-full relative group">
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Select Coin</label>
            <div className="relative">
              <select
                value={selectedCoin}
                onChange={(e) => setSelectedCoin(e.target.value)}
                className="w-full h-12 px-4 bg-gray-50/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all appearance-none shadow-sm hover:border-primary/50 dark:hover:border-primary/50 cursor-pointer"
                required
              >
                <option value="" disabled>Select a coin...</option>
                {marketData?.map(coin => (
                  <option key={coin.id} value={coin.id}>{coin.name} ({coin.symbol.toUpperCase()})</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
              {isLoading && (
                <div className="absolute right-10 top-1/2 -translate-y-1/2">
                  <Loader size={16} />
                </div>
              )}
            </div>
          </div>
          <div className="flex-1 w-full">
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Quantity</label>
            <input
              type="number"
              step="any"
              min="0"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="0.00"
              className="w-full h-12 px-4 bg-gray-50/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all shadow-sm hover:border-primary/50 dark:hover:border-primary/50"
              required
            />
          </div>
          <Button type="submit" disabled={!selectedCoin || !quantity} className="w-full md:w-auto h-12 px-8 bg-primary hover:bg-primary-light text-white font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300 rounded-xl border-0">
            Add to Portfolio
          </Button>
        </form>
      </div>

      <PortfolioTable />
    </div>
  );
}
