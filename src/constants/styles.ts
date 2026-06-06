/**
 * 디자인 토큰 기반 재사용 가능한 스타일 클래스
 */

export const SPACING = {
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
} as const;

export const PADDING = {
  xs: 'p-2',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
  xl: 'p-12',
} as const;

export const RADIUS = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
} as const;

export const BUTTON = {
  base: 'inline-flex items-center justify-center transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  outline: 'border-2 border-primary bg-card text-foreground hover:bg-primary hover:text-primary-foreground',
  ghost: 'bg-transparent hover:bg-accent text-foreground',
  icon: 'w-9 h-9 rounded-md bg-muted hover:bg-accent text-accent-foreground',
} as const;

export const CARD = {
  base: 'bg-card rounded-lg shadow-sm border border-border',
  interactive: 'bg-card rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow',
} as const;

export const TEXT = {
  primary: 'text-foreground',
  secondary: 'text-muted-foreground',
  muted: 'text-muted-foreground',
} as const;
