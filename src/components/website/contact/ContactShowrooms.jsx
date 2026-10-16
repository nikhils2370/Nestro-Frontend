const showrooms = [
    {
        city: "Jaipur",
        address: "MI Road, near Ajmeri Gate",
        hours: "10am – 7pm",
    },
    {
        city: "Mumbai",
        address: "Bandra West, Linking Road",
        hours: "11am – 8pm",
    },
    {
        city: "Bangalore",
        address: "Indiranagar, 100ft Road",
        hours: "10am – 7pm",
    },
];

export default function ContactShowrooms() {
    return (
        <section>
            <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.28em] text-[#9a6745]">
                Showrooms
            </p>

            <div className="grid grid-cols-1 gap-3 min-[430px]:grid-cols-3">
                {showrooms.map((showroom) => (
                    <div
                        key={showroom.city}
                        className="rounded-[11px] border border-[#e5ddd5] bg-white p-4"
                    >
                        <h3 className="text-[13px] font-medium text-[#201914]">
                            {showroom.city}
                        </h3>

                        <p className="mt-1 text-[11px] leading-5 text-[#756d66]">
                            {showroom.address}
                        </p>

                        <p className="mt-2 text-[10px] text-[#92745c]">
                            {showroom.hours}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}