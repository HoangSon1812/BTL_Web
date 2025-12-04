import React from 'react';

const SkeletonCard: React.FC = () => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col overflow-hidden h-full">
            <div className="relative h-64 bg-gray-200 animate-pulse" />
            <div className="p-4 flex-1 flex flex-col gap-3">
                <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
                <div className="mt-auto flex items-center justify-between pt-2">
                    <div className="h-6 bg-gray-200 rounded animate-pulse w-1/3" />
                    <div className="h-8 bg-gray-200 rounded animate-pulse w-1/4" />
                </div>
            </div>
        </div>
    );
};

export default SkeletonCard;
