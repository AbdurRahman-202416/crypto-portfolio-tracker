import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useCoinChart } from '../../hooks/useCoinChart';
import { format } from 'date-fns';
import { formatCurrency } from '../../utils/formatters';
import { Loader } from '../common/Loader';

interface PriceChartProps {
  coinId: string;
  days: string;
}

export const PriceChart = ({ coinId, days }: PriceChartProps) => {
  const { data, isLoading, isError } = useCoinChart(coinId, days);

  if (isLoading) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-800">
        <Loader size={32} />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="w-full h-[400px] flex flex-col items-center justify-center bg-red-50 dark:bg-red-900/20 rounded-xl text-red-500">
        <p>Failed to load chart data.</p>
      </div>
    );
  }

  const chartData = data.map((d) => ({
    ...d,
    date: new Date(d.time),
  }));

  return (
    <div className="w-full h-[400px] bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-100 dark:border-gray-800 shadow-sm">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.2} />
          <XAxis 
            dataKey="date" 
            tickFormatter={(date) => {
              if (days === '1') return format(date, 'HH:mm');
              return format(date, 'MMM dd');
            }}
            stroke="#6B7280"
            fontSize={12}
            tickMargin={10}
            minTickGap={30}
          />
          <YAxis 
            domain={['auto', 'auto']}
            tickFormatter={(val) => `$${val.toLocaleString()}`}
            stroke="#6B7280"
            fontSize={12}
            tickMargin={10}
            orientation="right"
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', borderRadius: '8px', color: '#fff' }}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            formatter={(value: any) => [formatCurrency(value as number), 'Price']}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            labelFormatter={(label: any) => format(label as Date, 'MMM dd, yyyy HH:mm')}
          />
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke="#3B82F6" 
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, fill: '#3B82F6' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
