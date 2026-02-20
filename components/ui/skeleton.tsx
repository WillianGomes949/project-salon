'use client'

import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular'
  width?: string | number
  height?: string | number
}

function Skeleton({ 
  className, 
  variant = 'text',
  width,
  height,
}: SkeletonProps) {
  const baseStyles = 'animate-pulse bg-gray-200'
  
  const variants = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  }

  const style: React.CSSProperties = {}
  if (width) style.width = typeof width === 'number' ? `${width}px` : width
  if (height) style.height = typeof height === 'number' ? `${height}px` : height

  return (
    <div
      className={cn(baseStyles, variants[variant], className)}
      style={style}
    />
  )
}

// Componentes pré-definidos para casos comuns
function SkeletonText({ lines = 1, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className="h-4 w-full" />
      ))}
    </div>
  )
}

function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn('space-y-3', className)}>
      <Skeleton variant="rectangular" className="h-40 w-full" />
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  )
}

function SkeletonAvatar({ size = 40, className }: { size?: number; className?: string }) {
  return (
    <Skeleton 
      variant="circular" 
      width={size} 
      height={size}
      className={className}
    />
  )
}

export { Skeleton, SkeletonText, SkeletonCard, SkeletonAvatar }
