export default function ContactLoading() {
    return (
        <main className="min-h-screen animate-pulse bg-[#faf8f5]">
            {/* Heading */}
            <section className="px-4 pt-7 sm:px-6 lg:px-7">
                <div className="h-2.5 w-24 rounded bg-[#e3dbd3]" />

                <div className="mt-3 h-8 w-[310px] rounded bg-[#e3dbd3]" />

                <div className="mt-3 h-4 w-[500px] max-w-full rounded bg-[#e3dbd3]" />
            </section>

            {/* Content */}
            <section className="px-4 py-8 sm:px-6 lg:px-7">
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-[0.75fr_1fr]">

                    {/* Left */}
                    <div className="space-y-4">

                        {/* Contact Info */}
                        <div className="rounded-[12px] border border-[#e5ddd5] bg-white p-6">
                            <div className="space-y-6">
                                {[1, 2, 3, 4].map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-3"
                                    >
                                        <div className="h-10 w-10 rounded-[9px] bg-[#e7dfd7]" />

                                        <div className="space-y-2">
                                            <div className="h-2 w-16 rounded bg-[#e3dbd3]" />
                                            <div className="h-3 w-36 rounded bg-[#e3dbd3]" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Map */}
                        <div className="h-[200px] rounded-[12px] bg-[#30231a]" />

                        {/* Showrooms */}
                        <div>
                            <div className="mb-3 h-2.5 w-20 rounded bg-[#e3dbd3]" />

                            <div className="grid grid-cols-3 gap-3">
                                {[1, 2, 3].map((item) => (
                                    <div
                                        key={item}
                                        className="h-[112px] rounded-[11px] bg-white"
                                    />
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Form */}
                    <div className="min-h-[600px] rounded-[12px] border border-[#e5ddd5] bg-white p-7">
                        <div className="h-6 w-44 rounded bg-[#e3dbd3]" />

                        <div className="mt-3 h-3 w-64 rounded bg-[#e7dfd7]" />

                        <div className="mt-7 space-y-5">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="h-10 rounded bg-[#e9e2db]" />
                                <div className="h-10 rounded bg-[#e9e2db]" />
                            </div>

                            <div className="h-10 rounded bg-[#e9e2db]" />
                            <div className="h-10 rounded bg-[#e9e2db]" />
                            <div className="h-[125px] rounded bg-[#e9e2db]" />
                            <div className="h-10 rounded bg-[#9a6a47]" />
                        </div>
                    </div>

                </div>
            </section>
        </main>
    );
}