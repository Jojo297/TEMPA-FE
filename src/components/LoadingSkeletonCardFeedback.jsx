import { Card } from "./ui/card";

export default function LoadingSkeletonCardFeedback() {
  return (
    <>
      <Card className="p-6 mb-4 w-full">
        <div className="flex items-start gap-3 mb-4">
          {/* Avatar Skeleton */}
          <div className="h-12 w-12 shrink-0 rounded-full bg-muted animate-pulse" />

          <div className="flex flex-col gap-2">
            {/* Name Skeleton */}
            <div className="h-5 w-32 bg-muted animate-pulse rounded" />
            {/* Email Skeleton */}
            <div className="h-3 w-48 bg-muted animate-pulse rounded" />
            {/* Stars Skeleton */}
            <div className="flex gap-0.5 mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="w-4 h-4 bg-muted animate-pulse rounded-full"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Evaluation Text Skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-4 w-full bg-muted animate-pulse rounded" />
          <div className="h-4 w-[90%] bg-muted animate-pulse rounded" />
          <div className="h-4 w-[80%] bg-muted animate-pulse rounded" />
        </div>
      </Card>
      <Card className="p-6 mb-4 w-full">
        <div className="flex items-start gap-3 mb-4">
          {/* Avatar Skeleton */}
          <div className="h-12 w-12 shrink-0 rounded-full bg-muted animate-pulse" />

          <div className="flex flex-col gap-2">
            {/* Name Skeleton */}
            <div className="h-5 w-32 bg-muted animate-pulse rounded" />
            {/* Email Skeleton */}
            <div className="h-3 w-48 bg-muted animate-pulse rounded" />
            {/* Stars Skeleton */}
            <div className="flex gap-0.5 mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="w-4 h-4 bg-muted animate-pulse rounded-full"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Evaluation Text Skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-4 w-full bg-muted animate-pulse rounded" />
          <div className="h-4 w-[90%] bg-muted animate-pulse rounded" />
          <div className="h-4 w-[80%] bg-muted animate-pulse rounded" />
        </div>
      </Card>
      <Card className="p-6 mb-4 w-full">
        <div className="flex items-start gap-3 mb-4">
          {/* Avatar Skeleton */}
          <div className="h-12 w-12 shrink-0 rounded-full bg-muted animate-pulse" />

          <div className="flex flex-col gap-2">
            {/* Name Skeleton */}
            <div className="h-5 w-32 bg-muted animate-pulse rounded" />
            {/* Email Skeleton */}
            <div className="h-3 w-48 bg-muted animate-pulse rounded" />
            {/* Stars Skeleton */}
            <div className="flex gap-0.5 mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="w-4 h-4 bg-muted animate-pulse rounded-full"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Evaluation Text Skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-4 w-full bg-muted animate-pulse rounded" />
          <div className="h-4 w-[90%] bg-muted animate-pulse rounded" />
          <div className="h-4 w-[80%] bg-muted animate-pulse rounded" />
        </div>
      </Card>
    </>
  );
}

export const LoadingSkeletonRatingProgram = () => {
  return (
    <Card className="p-6 mb-6 w-full flex items-center gap-6">
      <div className="text-center">
        <span className="text-4xl font-bold text-[#013B35]">
          <div className="h-16 w-14 bg-muted animate-pulse rounded" />
        </span>
        <div className="h-3 w-14 bg-muted mt-2 animate-pulse rounded" />
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex gap-1">
          <div className="h-6 w-48 bg-muted animate-pulse rounded" />
        </div>
        <p className="text-sm text-muted-foreground">
          <div className="h-6 w-48 bg-muted animate-pulse rounded" />
        </p>
      </div>
    </Card>
  );
};
