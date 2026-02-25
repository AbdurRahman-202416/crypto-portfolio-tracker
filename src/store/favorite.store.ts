import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoriteState {
    favorites: string[]; // array of coin IDs
    toggleFavorite: (coinId: string) => void;
    isFavorite: (coinId: string) => boolean;
}

export const useFavoriteStore = create<FavoriteState>()(
    persist(
        (set, get) => ({
            favorites: [],
            toggleFavorite: (coinId) =>
                set((state) => ({
                    favorites: state.favorites.includes(coinId)
                        ? state.favorites.filter((id) => id !== coinId)
                        : [...state.favorites, coinId],
                })),
            isFavorite: (coinId) => get().favorites.includes(coinId),
        }),
        {
            name: 'crypto-favorites-storage',
        }
    )
);
