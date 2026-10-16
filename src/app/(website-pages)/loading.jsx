export default function Loading() {
    return (
        <div className="min-h-screen bg-[#faf8f5]">
           
            {/* Content */}
            <main className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">
                {/* Hero */}
                <div className="h-[260px] animate-pulse rounded-[14px] bg-[#e7e0d9] sm:h-[300px]" />

                {/* Sections */}
                <div className="mt-10">
                    <div className="h-3 w-24 animate-pulse rounded bg-[#e3dbd3]" />

                    <div className="mt-3 h-7 w-48 animate-pulse rounded bg-[#e3dbd3]" />
                </div>

                {/* Cards */}
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {[1, 2, 3, 4].map((item) => (
                        <div
                            key={item}
                            className="overflow-hidden rounded-[11px] border border-[#e7dfd7] bg-white"
                        >
                            <div className="aspect-[1.35/1] animate-pulse bg-[#e5ded7]" />

                            <div className="space-y-3 p-4">
                                <div className="h-2 w-20 animate-pulse rounded bg-[#e5ded7]" />
                                <div className="h-4 w-36 animate-pulse rounded bg-[#e5ded7]" />

                                <div className="flex justify-between">
                                    <div className="h-3 w-20 animate-pulse rounded bg-[#e5ded7]" />
                                    <div className="h-4 w-20 animate-pulse rounded bg-[#e5ded7]" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}