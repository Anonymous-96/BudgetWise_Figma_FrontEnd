import React from 'react';
import { Building2, TrendingUp } from 'lucide-react';

interface LogoProps {
  variant?: 'default' | 'compact' | 'text-only';
  className?: string;
  showIcon?: boolean;
}

export default function Logo({ variant = 'default', className = '', showIcon = true }: LogoProps) {
  const baseClasses = "flex items-center";
  
  if (variant === 'text-only') {
    return (
      <div className={`${baseClasses} ${className}`}>
        <span className="font-heading font-bold text-foreground tracking-tight">
          Finance<span className="text-primary">Flow</span>
        </span>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`${baseClasses} space-x-2 ${className}`}>
        {showIcon && (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Building2 className="h-4 w-4 text-primary-foreground" />
          </div>
        )}
        <span className="font-heading font-bold text-lg text-foreground tracking-tight">
          Finance<span className="text-primary">Flow</span>
        </span>
      </div>
    );
  }

  // Default variant
  return (
    <div className={`${baseClasses} space-x-3 ${className}`}>
      {showIcon && (
        <div className="relative">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg">
            <Building2 className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500">
            <TrendingUp className="h-2.5 w-2.5 text-white" />
          </div>
        </div>
      )}
      <div className="flex flex-col">
        <span className="font-heading font-bold text-xl text-foreground tracking-tight leading-none">
          Finance<span className="text-primary">Flow</span>
        </span>
        <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
          Professional
        </span>
      </div>
    </div>
  );
}

// Standalone icon component for use in other places
export function LogoIcon({ size = 'default', className = '' }: { size?: 'sm' | 'default' | 'lg'; className?: string }) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    default: 'h-8 w-8', 
    lg: 'h-10 w-10'
  };

  const iconSizes = {
    sm: 'h-3 w-3',
    default: 'h-4 w-4',
    lg: 'h-5 w-5'
  };

  return (
    <div className={`relative ${className}`}>
      <div className={`flex items-center justify-center rounded-xl bg-primary shadow-lg ${sizeClasses[size]}`}>
        <Building2 className={`text-primary-foreground ${iconSizes[size]}`} />
      </div>
      <div className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3 items-center justify-center rounded-full bg-emerald-500">
        <TrendingUp className="h-1.5 w-1.5 text-white" />
      </div>
    </div>
  );
}