import Link from "next/link";
import { FiPlus } from "react-icons/fi";

export default function TableHeader({tital,p,add_page}) {
  return (
    <div className="flex items-start justify-between mb-6">
      {/* Left */}
      <div>
        <h1 className="text-[25px] font-semibold leading-8 text-[#101828]">
          {tital} Management
        </h1>

        <p className="mt-1 text-[13px] text-[#667085]">{p}</p>
      </div>

      {/* Right */}
      <Link
        href={add_page}
        className="h-[42px] px-5 rounded-[12px] bg-[#009f98] hover:bg-[#008f89] text-white text-[13px] font-semibold flex items-center gap-2 shadow-sm transition-colors"
      >
        <FiPlus size={17} strokeWidth={2.2} />
        Add {tital}
      </Link>
    </div>
  );
}
