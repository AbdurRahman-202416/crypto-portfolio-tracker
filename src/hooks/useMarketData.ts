import { useQuery } from '@tanstack/react-query';
import { fetchMarketPrices } from '../services/coingecko.api';

export const useMarketData = (page = 1, perPage = 100) => {
    return useQuery({
        queryKey: ['market-data', page, perPage],
        queryFn: () => fetchMarketPrices(page, perPage),
        staleTime: 1000 * 30, // 30 seconds
        refetchInterval: 1000 * 60, // Auto-refresh every 60s
        retry: 3,
    });
};
