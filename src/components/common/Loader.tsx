import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

interface LoaderProps {
  className?: string;
  size?: number;
}

export const Loader = ({ className, size = 24 }: LoaderProps) => {
  return (
    <Loader2
      size={size}
      className={cn("animate-spin text-blue-600 dark:text-blue-500", className)}
    />
  );
};
