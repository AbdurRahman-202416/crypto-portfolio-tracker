import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PortfolioItem } from '../types';

interface PortfolioState {
    items: PortfolioItem[];
    addItem: (item: Omit<PortfolioItem, 'id' | 'addedAt'>) => void;
    removeItem: (id: string) => void;
    updateItem: (id: string, updates: Partial<PortfolioItem>) => void;
    clearPortfolio: () => void;
}

export const usePortfolioStore = create<PortfolioState>()(
    persist(
        (set) => ({
            items: [],
            addItem: (item) =>
                set((state) => ({
                    items: [
                        ...state.items,
                        {
                            ...item,
                            id: crypto.randomUUID(),
                            addedAt: Date.now(),
                        },
                    ],
                })),
            removeItem: (id) =>
                set((state) => ({
                    items: state.items.filter((i) => i.id !== id),
                })),
            updateItem: (id, updates) =>
                set((state) => ({
                    items: state.items.map((i) =>
                        i.id === id ? { ...i, ...updates } : i
                    ),
                })),
            clearPortfolio: () => set({ items: [] }),
        }),
        {
            name: 'crypto-portfolio-storage',
        }
    )
);
