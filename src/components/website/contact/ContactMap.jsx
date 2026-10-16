import { FiMap, FiMapPin } from "react-icons/fi";

export default function ContactMap() {
    return (
        <a
            href="https://www.google.com/maps/search/?api=1&query=MI+Road+Jaipur+Rajasthan"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex min-h-[190px] items-center justify-center rounded-[12px] bg-[#2d2017] transition hover:bg-[#38271d] sm:min-h-[200px]"
        >
            <div className="flex items-center gap-3 text-[#c4a98f] transition group-hover:text-[#d8bca0]">
                <div className="relative">
                    <FiMap size={24} strokeWidth={1.5} />

                    <FiMapPin
                        size={12}
                        strokeWidth={2}
                        className="absolute -bottom-1 -right-1"
                    />
                </div>

                <span className="text-[14px]">
                    View on Google Maps
                </span>
            </div>
        </a>
    );
}