import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AlertSetting } from '../types';

interface UiState {
    theme: 'dark' | 'light';
    toggleTheme: () => void;
    alerts: AlertSetting[];
    addAlert: (alert: Omit<AlertSetting, 'id'>) => void;
    removeAlert: (id: string) => void;
}

export const useUiStore = create<UiState>()(
    persist(
        (set) => ({
            theme: 'dark',
            toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
            alerts: [],
            addAlert: (alert) =>
                set((state) => ({
                    alerts: [...state.alerts, { ...alert, id: crypto.randomUUID() }],
                })),
            removeAlert: (id) =>
                set((state) => ({
                    alerts: state.alerts.filter((a) => a.id !== id),
                })),
        }),
        {
            name: 'crypto-ui-storage',
        }
    )
);
