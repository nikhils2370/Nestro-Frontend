// import Button from '../ui/Button'

export default function PromoBanner() {
  return (
    <div className="bg-[#2C2016] rounded-xl flex flex-col sm:flex-row justify-between items-center gap-4 px-6 py-5 my-10">
      <div className="flex flex-col gap-1 text-center sm:text-left">
        <p className="text-[10px] tracking-[0.2em] uppercase text-[#D6BFA7]">
          Limited Time
        </p>
        <p className="text-lg font-medium text-white">
          Get <span className="italic text-[#D6BFA7]">15% off</span> on orders above ₹50,000
        </p>
        <p className="text-xs text-white/50">Use code NESTRO15 at checkout. Valid through this month.</p>
      </div>
      <div className="flex-shrink-0">
        {/* <Button variant="primary">Claim Offer</Button> */}
      </div>
    </div>
  )
}