import { useQuery } from '@tanstack/react-query';
import { fetchCoinDetails } from '../services/coingecko.api';
import { CoinDetail } from '../types';

export const useCoinData = (id: string) => {
    return useQuery<CoinDetail>({
        queryKey: ['coin-detail', id],
        queryFn: () => fetchCoinDetails(id),
        staleTime: 1000 * 60, // 1 minute
        retry: 3,
        enabled: !!id,
    });
};
