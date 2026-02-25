import { useQuery } from '@tanstack/react-query';
import { fetchCoinChart } from '../services/coingecko.api';

export const useCoinChart = (id: string, days = '1') => {
    return useQuery({
        queryKey: ['coin-chart', id, days],
        queryFn: () => fetchCoinChart(id, days),
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 3,
        enabled: !!id,
    });
};
