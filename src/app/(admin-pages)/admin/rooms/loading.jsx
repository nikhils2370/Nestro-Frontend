export default function CategoryLoading() {
  return (
    <div className="min-h-[calc(100vh-65px)] bg-[#f8fafc] px-7 py-7 animate-pulse">
      {/* ================= HEADER ================= */}
      <div className="flex items-start justify-between mb-6">
        {/* Title */}
        <div>
          <div className="w-[230px] h-[30px] rounded-md bg-[#e9edf1]" />

          <div className="mt-2 w-[280px] h-[15px] rounded-md bg-[#e9edf1]" />
        </div>

        {/* Add Category Button */}
        <div className="w-[145px] h-[42px] rounded-[12px] bg-[#e2e7eb]" />
      </div>

      {/* ================= TABLE ================= */}
      <div className="w-full overflow-hidden rounded-[16px] border border-[#e7eaee] bg-white shadow-[0_1px_3px_rgba(16,24,40,0.04)]">
        {/* ================= TABLE HEADER ================= */}
        <div className="grid grid-cols-[92px_1.2fr_1fr_1fr_150px] min-h-[49px] items-center border-b border-[#edf0f2] px-5">
          <div className="w-[45px] h-[11px] rounded bg-[#e9edf1]" />

          <div className="w-[40px] h-[11px] rounded bg-[#e9edf1]" />

          <div className="w-[38px] h-[11px] rounded bg-[#e9edf1]" />

          <div className="w-[45px] h-[11px] rounded bg-[#e9edf1]" />

          <div className="ml-auto w-[50px] h-[11px] rounded bg-[#e9edf1]" />
        </div>

        {/* ================= ROWS ================= */}
        <CategoryRow />
        <CategoryRow />
        <CategoryRow />
        <CategoryRow />
        <CategoryRow />
      </div>
    </div>
  );
}

/* =====================================================
   CATEGORY ROW SKELETON
===================================================== */

function CategoryRow() {
  return (
    <div className="grid grid-cols-[92px_1.2fr_1fr_1fr_150px] min-h-[77px] items-center border-b border-[#f0f2f4] px-5">
      {/* Image */}
      <div>
        <div className="w-[44px] h-[44px] rounded-[12px] bg-[#eef1f3] border border-[#e4e7ec]" />
      </div>

      {/* Name */}
      <div>
        <div className="w-[85px] h-[14px] rounded bg-[#e9edf1]" />
      </div>

      {/* Slug */}
      <div>
        <div className="w-[75px] h-[13px] rounded bg-[#eef1f3]" />
      </div>

      {/* Status */}
      <div>
        <div className="w-[65px] h-[27px] rounded-full bg-[#e9edf1]" />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2">
        <div className="w-[55px] h-[32px] rounded-[8px] bg-[#eef1f3]" />

        <div className="w-[65px] h-[32px] rounded-[8px] bg-[#eef1f3]" />
      </div>
    </div>
  );
}
