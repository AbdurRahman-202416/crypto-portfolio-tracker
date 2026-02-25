export interface Coin {
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    market_cap: number;
    market_cap_rank: number;
    fully_diluted_valuation: number | null;
    total_volume: number;
    high_24h: number;
    low_24h: number;
    price_change_24h: number;
    price_change_percentage_24h: number;
    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;
    circulating_supply: number;
    total_supply: number | null;
    max_supply: number | null;
}

export type MarketData = Coin;

export interface PortfolioItem {
    id: string;
    coinId: string;
    name: string;
    symbol: string;
    image: string;
    quantity: number;
    buyPrice?: number;
    addedAt: number;
}

export interface ChartDataPoint {
    time: number;
    price: number;
}

export interface CoinDetail {
    id: string;
    symbol: string;
    name: string;
    description: {
        en: string;
    };
    image: {
        thumb: string;
        small: string;
        large: string;
    };
    market_cap_rank: number;
    market_data: {
        current_price: { usd: number };
        price_change_percentage_24h: number;
        market_cap: { usd: number };
        total_volume: { usd: number };
        high_24h: { usd: number };
        low_24h: { usd: number };
    };
}

export interface AlertSetting {
    id: string;
    coinId: string;
    targetPrice: number;
    condition: 'above' | 'below';
    isActive: boolean;
}
