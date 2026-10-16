import {
    FiPhone,
    FiMail,
    FiClock,
    FiMapPin,
} from "react-icons/fi";

const contactItems = [
    {
        icon: FiPhone,
        label: "Phone",
        value: "+91 98765 43210",
    },
    {
        icon: FiMail,
        label: "Email",
        value: "hello@Nestro.in",
    },
    {
        icon: FiClock,
        label: "Hours",
        value: "Mon – Sat, 10am – 7pm IST",
    },
    {
        icon: FiMapPin,
        label: "Flagship Showroom",
        value: "MI Road, Jaipur, Rajasthan",
    },
];

export default function ContactInfo() {
    return (
        <div className="rounded-[12px] border border-[#e5ddd5] bg-white p-5 sm:p-6">
            <div className="space-y-5">
                {contactItems.map((item) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={item.label}
                            className="flex items-center gap-3"
                        >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[9px] bg-[#f4ece3] text-[#896348]">
                                <Icon size={18} strokeWidth={1.7} />
                            </div>

                            <div className="min-w-0">
                                <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#77716d]">
                                    {item.label}
                                </p>

                                <p className="mt-1 text-[12px] text-[#211b17] sm:text-[13px]">
                                    {item.value}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}