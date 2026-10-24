import { cn } from '../lib/utils';

export function Logo({
  variant = 'light',
  className,
}: {
  variant?: 'light' | 'dark';
  className?: string;
}) {
  const textColor = variant === 'dark' ? 'text-white' : 'text-ink';
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <span className="flex h-8 w-8 items-center justify-center rounded-md bg-brand-600">
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
          <path d="M4 6h16" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M12 6v13" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M7.5 19h9" stroke="white" strokeWidth="2.2" strokeLinecap="round" opacity="0.65" />
        </svg>
      </span>
      <span className={cn('text-lg font-semibold tracking-tight', textColor)}>
        TSoft
      </span>
    </span>
  );
}
