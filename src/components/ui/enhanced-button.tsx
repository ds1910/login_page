import React, { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const enhancedButtonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-semibold transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group',
  {
    variants: {
      variant: {
        default: 
          'bg-gradient-primary text-primary-foreground shadow-primary hover:shadow-primary hover:scale-105 active:scale-95',
        secondary:
          'bg-gradient-secondary text-secondary-foreground shadow-secondary hover:shadow-secondary hover:scale-105 active:scale-95',
        accent:
          'bg-gradient-to-br from-accent to-accent-hover text-accent-foreground shadow-accent hover:shadow-accent hover:scale-105 active:scale-95',
        outline:
          'glass border-card-border hover:bg-muted/50 hover:border-primary/50 hover:glow-primary text-foreground',
        ghost: 
          'hover:bg-muted/50 hover:text-foreground text-foreground',
        social:
          'glass border-card-border hover:bg-muted/50 hover:border-primary/30 hover:glow-primary text-foreground hover:scale-105',
        destructive:
          'bg-destructive text-destructive-foreground shadow-destructive hover:shadow-destructive hover:scale-105 active:scale-95',
      },
      size: {
        default: 'h-14 px-6 py-3',
        sm: 'h-10 px-4 py-2 text-xs',
        lg: 'h-16 px-8 py-4 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface EnhancedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof enhancedButtonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const EnhancedButton = forwardRef<HTMLButtonElement, EnhancedButtonProps>(
  ({ className, variant, size, asChild = false, loading, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    
    return (
      <Comp
        className={cn(enhancedButtonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {/* Shimmer effect */}
        <div className="absolute inset-0 -top-1 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Content */}
        <div className="relative z-10 flex items-center gap-2">
          {loading && (
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          )}
          {children}
        </div>
      </Comp>
    );
  }
);

EnhancedButton.displayName = 'EnhancedButton';

export { EnhancedButton, enhancedButtonVariants };