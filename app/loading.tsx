import { LoadingSkeleton } from '@/components/loading-skeleton'

export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <LoadingSkeleton className="h-32 w-32" />
    </div>
  )
} 