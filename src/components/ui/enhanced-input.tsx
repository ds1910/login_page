import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  isPassword?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
  error?: string;
  success?: boolean;
  label?: string;
}

const EnhancedInput = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    type, 
    icon, 
    isPassword, 
    showPassword, 
    onTogglePassword, 
    error, 
    success, 
    label,
    ...props 
  }, ref) => {
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;
    const hasError = !!error;
    const hasSuccess = success && !hasError;

    return (
      <div className="space-y-2">
        {label && (
          <label 
            htmlFor={props.id} 
            className="text-sm font-medium text-foreground block"
          >
            {label}
          </label>
        )}
        <div className="relative group">
          {/* Icon */}
          {icon && (
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors duration-200 z-10">
              {icon}
            </div>
          )}

          {/* Input */}
          <input
            type={inputType}
            className={cn(
              'flex h-14 w-full rounded-2xl glass border transition-all duration-300 ease-out',
              'px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0',
              'disabled:cursor-not-allowed disabled:opacity-50',
              'hover:border-input-focus/50',
              // Icon padding
              icon && 'pl-12',
              // Password toggle padding
              isPassword && 'pr-12',
              // Default state
              'border-input-border bg-input',
              // Focus state
              'focus-visible:border-input-focus focus-visible:ring-input-focus/20 focus-visible:glow-primary',
              // Error state
              hasError && 'border-input-invalid focus-visible:border-input-invalid focus-visible:ring-destructive/20 glow-destructive',
              // Success state
              hasSuccess && 'border-input-valid focus-visible:border-input-valid focus-visible:ring-success/20 glow-success',
              className
            )}
            ref={ref}
            {...props}
          />

          {/* Password Toggle */}
          {isPassword && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10 w-10 p-0 hover:bg-muted/50 transition-colors duration-200"
              onClick={onTogglePassword}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
          )}

          {/* Status Icons */}
          {(hasError || hasSuccess) && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              {hasError && <AlertCircle className="h-4 w-4 text-destructive" />}
              {hasSuccess && <CheckCircle2 className="h-4 w-4 text-success" />}
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-sm text-destructive flex items-center gap-1 animate-slide-in">
            <AlertCircle className="h-3 w-3" />
            {error}
          </p>
        )}
      </div>
    );
  }
);

EnhancedInput.displayName = 'EnhancedInput';

export { EnhancedInput };