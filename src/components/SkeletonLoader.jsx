import React from 'react';

export const MovieCardSkeleton = () => {
  return (
    <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2 flex-shrink-0 animate-pulse">
      <div className="w-full h-auto aspect-[2/3] bg-gray-800 rounded-md"></div>
    </div>
  );
};

export const MovieRowSkeleton = () => {
  return (
    <div className="w-full flex gap-2 overflow-x-hidden p-4">
      {[...Array(6)].map((_, i) => (
        <MovieCardSkeleton key={i} />
      ))}
    </div>
  );
};

export const BannerSkeleton = () => {
   return <div className="w-full h-[550px] bg-gray-900 animate-pulse"></div>;
};

export const DetailSkeleton = () => {
    return (
        <div className="w-full h-[600px] bg-gray-900 animate-pulse p-4 md:p-12 flex items-center">
            <div className="flex flex-col gap-4 w-full md:w-[50%]">
                <div className="h-10 bg-gray-800 w-3/4 rounded"></div>
                <div className="h-6 bg-gray-800 w-1/4 rounded"></div>
                <div className="flex gap-2">
                   <div className="h-6 bg-gray-800 w-16 rounded"></div>
                   <div className="h-6 bg-gray-800 w-16 rounded"></div>
                </div>
                <div className="h-24 bg-gray-800 w-full rounded mt-4"></div>
            </div>
        </div>
    );
}
