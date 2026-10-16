export default function StoreLoading() {
    return (
        <div className="min-h-screen bg-[#faf8f5]">

            {/* =====================================
          HEADER
      ===================================== */}

            <header className="h-[58px] border-b border-[#e8e0d8] bg-[#faf9f7]">
                <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-5 sm:px-8">

                    {/* Logo */}
                    <div className="h-4 w-20 animate-pulse rounded bg-[#e4ddd5]" />

                    {/* Nav */}
                    <div className="hidden items-center gap-7 md:flex">
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <div
                                key={item}
                                className="h-3 w-11 animate-pulse rounded bg-[#e7dfd7]"
                            />
                        ))}
                    </div>

                    {/* Right */}
                    <div className="flex items-center gap-3">
                        <div className="h-5 w-5 animate-pulse rounded-full bg-[#e4ddd5]" />

                        <div className="h-5 w-5 animate-pulse rounded-full bg-[#e4ddd5]" />

                        <div className="h-8 w-8 animate-pulse rounded-full bg-[#e4ddd5]" />
                    </div>
                </div>
            </header>


            {/* =====================================
          MAIN
      ===================================== */}

            <main className="mx-auto max-w-[1400px] px-4 py-5 sm:px-6 lg:px-8">

                {/* =====================================
            STORE HERO
        ===================================== */}

                <div className="overflow-hidden rounded-[14px] bg-[#e0d8d0]">

                    <div className="grid min-h-[270px] grid-cols-1 md:grid-cols-2">

                        {/* Text */}
                        <div className="flex flex-col justify-center bg-[#33251b] p-7 sm:p-10">

                            <div className="h-2.5 w-40 animate-pulse rounded bg-[#725843]" />

                            <div className="mt-5 h-10 w-64 animate-pulse rounded bg-[#5a4636]" />

                            <div className="mt-2 h-9 w-48 animate-pulse rounded bg-[#5a4636]" />

                            <div className="mt-5 space-y-2">
                                <div className="h-3 w-72 animate-pulse rounded bg-[#594738]" />
                                <div className="h-3 w-60 animate-pulse rounded bg-[#594738]" />
                            </div>

                            <div className="mt-6 h-10 w-36 animate-pulse rounded bg-[#795439]" />
                        </div>

                        {/* Image */}
                        <div className="min-h-[230px] animate-pulse bg-[#d4cbc2]" />
                    </div>
                </div>


                {/* =====================================
            CONTENT
        ===================================== */}

                <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-[220px_minmax(0,1fr)]">

                    {/* =====================================
              FILTER SIDEBAR
          ===================================== */}

                    <aside className="hidden rounded-[11px] border border-[#e5ddd5] bg-white p-5 lg:block">

                        <div className="mb-5 h-2.5 w-14 animate-pulse rounded bg-[#ded5cd]" />

                        {/* Filter Sections */}
                        {[1, 2, 3, 4, 5, 6].map((section) => (
                            <div
                                key={section}
                                className="border-b border-[#eee7e0] py-4 first:pt-0 last:border-b-0"
                            >

                                <div className="mb-3 h-3 w-20 animate-pulse rounded bg-[#dfd7cf]" />

                                <div className="space-y-3">
                                    {[1, 2, 3, 4].map((item) => (
                                        <div
                                            key={item}
                                            className="flex items-center gap-2"
                                        >
                                            <div className="h-[15px] w-[15px] animate-pulse rounded-[4px] bg-[#e4ddd6]" />

                                            <div
                                                className="h-2.5 animate-pulse rounded bg-[#e5ded7]"
                                                style={{
                                                    width: `${55 + item * 10}px`,
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>

                            </div>
                        ))}
                    </aside>


                    {/* =====================================
              RIGHT SIDE
          ===================================== */}

                    <div className="min-w-0">

                        {/* Toolbar */}
                        <div className="flex flex-col gap-3 rounded-[11px] border border-[#e5ddd5] bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between">

                            <div className="h-3 w-28 animate-pulse rounded bg-[#ded6ce]" />

                            <div className="flex gap-2">

                                <div className="h-7 w-24 animate-pulse rounded-full bg-[#eee7e0]" />

                                <div className="h-7 w-20 animate-pulse rounded-full bg-[#eee7e0]" />

                                <div className="h-8 w-32 animate-pulse rounded-[5px] bg-[#e7dfd8]" />

                            </div>
                        </div>


                        {/* Product Grid */}
                        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">

                            {[1, 2, 3, 4, 5, 6].map((item) => (
                                <ProductSkeleton key={item} />
                            ))}

                        </div>


                        {/* Promo */}
                        <div className="mt-5 flex min-h-[80px] animate-pulse items-center justify-between rounded-[10px] bg-[#30231a] px-6 py-5">

                            <div className="space-y-3">
                                <div className="h-2.5 w-28 rounded bg-[#584332]" />

                                <div className="h-4 w-72 rounded bg-[#584332]" />
                            </div>

                            <div className="hidden h-9 w-28 rounded bg-[#604631] sm:block" />

                        </div>


                        {/* Pagination */}
                        <div className="flex flex-col items-center gap-3 pt-7">

                            <div className="flex gap-2">

                                {[1, 2, 3, 4, 5].map((item) => (
                                    <div
                                        key={item}
                                        className="h-9 w-9 animate-pulse rounded-[6px] bg-[#e4dcd4]"
                                    />
                                ))}

                            </div>

                            <div className="h-10 w-[225px] animate-pulse rounded-[5px] bg-[#e3dbd3]" />

                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}


/* =====================================
   PRODUCT SKELETON
===================================== */

function ProductSkeleton() {
    return (
        <div className="overflow-hidden rounded-[11px] border border-[#e4dcd5] bg-white">

            {/* Image */}
            <div className="aspect-[1.45/1] animate-pulse bg-[#e3dcd5]" />

            {/* Content */}
            <div className="space-y-3 p-3">

                {/* Category */}
                <div className="h-2 w-24 animate-pulse rounded bg-[#e3dcd5]" />

                {/* Name */}
                <div className="h-3.5 w-36 animate-pulse rounded bg-[#e1d9d1]" />

                {/* Bottom */}
                <div className="flex items-center justify-between pt-2">

                    <div className="h-2.5 w-20 animate-pulse rounded bg-[#e5ded7]" />

                    <div className="h-3.5 w-20 animate-pulse rounded bg-[#ded6ce]" />

                </div>

            </div>
        </div>
    );
}