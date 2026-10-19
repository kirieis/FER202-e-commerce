import React from 'react';

export const PageSkeleton: React.FC = () => {
  return (
    <div className="max-w-[1240px] w-full mx-auto px-4 sm:px-8 py-10 animate-pulse">
      {/* Top Breadcrumb Bar Skeleton */}
      <div className="flex items-center justify-between pb-6 border-b border-[var(--ln)]">
        <div className="flex items-center gap-3">
          <div className="h-8 w-24 rounded-full bg-[var(--surface)]" />
          <div className="h-4 w-48 rounded-full bg-[var(--surface)] hidden sm:block" />
        </div>
        <div className="h-4 w-32 rounded-full bg-[var(--surface)]" />
      </div>

      {/* Main Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-8">
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="w-full min-h-[380px] sm:min-h-[440px] rounded-3xl bg-[var(--surface)] border border-[var(--ln)]" />
          <div className="grid grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-24 rounded-2xl bg-[var(--surface)] border border-[var(--ln)]" />
            ))}
          </div>
        </div>
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div className="space-y-3">
            <div className="h-4 w-28 rounded-full bg-[var(--surface)]" />
            <div className="h-9 w-3/4 rounded-2xl bg-[var(--surface)]" />
            <div className="h-4 w-1/2 rounded-full bg-[var(--surface)]" />
          </div>
          <div className="h-32 rounded-3xl bg-[var(--surface)] border border-[var(--ln)]" />
          <div className="grid grid-cols-2 gap-3">
            <div className="h-20 rounded-2xl bg-[var(--surface)] border border-[var(--ln)]" />
            <div className="h-20 rounded-2xl bg-[var(--surface)] border border-[var(--ln)]" />
          </div>
          <div className="h-14 rounded-full bg-[var(--surface)]" />
        </div>
      </div>
    </div>
  );
};
