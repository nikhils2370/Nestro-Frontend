
// import Button from "../ui/Button";

export default function StoreHero() {
  return (
    <div className="relative flex h-[300px] items-center overflow-hidden rounded-2xl bg-gradient-to-r from-[#2C2016] to-[#5A3D24]">
      <div className="relative z-10 flex max-w-[520px] flex-col gap-3 px-6 md:px-12">
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#D6BFA7]">
          All Collections
        </span>

        <h1 className="text-3xl font-normal leading-tight text-white md:text-4xl">
          Discover{" "}
          <span className="italic text-[#D6BFA7]">
            Timeless
          </span>{" "}
          Pieces
        </h1>

        <p className="text-sm leading-relaxed text-white/60">
          Carefully curated furniture designed to elevate every corner of your home.
        </p>

        <div className="mt-1">
          {/* <Button variant="primary">
            Browse All
          </Button> */}
        </div>
      </div>

      <div className="absolute right-0 top-0 bottom-0 hidden w-[45%] md:block">
        <img
          src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&auto=format&fit=crop"
          alt="Store banner"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#2C2016] via-[#2C2016]/10 to-transparent" />
      </div>
    </div>
  );
}