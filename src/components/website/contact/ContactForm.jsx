"use client";

import { FiSend } from "react-icons/fi";

export default function ContactForm() {
    const handleSubmit = (event) => {
        event.preventDefault();

        // API call yahan add kar sakte hain
        console.log("Contact form submitted");
    };

    return (
        <div className="rounded-[12px] border border-[#e5ddd5] bg-white p-6 sm:p-7 lg:p-8">
            {/* Heading */}
            <div>
                <h2 className="text-[19px] font-normal text-[#201914]">
                    Send us a message
                </h2>

                <p className="mt-1 text-[12px] text-[#77716d]">
                    We typically respond within 24 hours.
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="mt-5 space-y-3"
            >
                {/* First / Last Name */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                        <label
                            htmlFor="firstName"
                            className="mb-1.5 block text-[11px] text-[#706963]"
                        >
                            First Name
                        </label>

                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            placeholder="Rahul"
                            className="h-10 w-full rounded-[6px] border border-[#e6e1dc] bg-[#fdfcfb] px-3 text-[12px] text-[#211b17] outline-none transition placeholder:text-[#908983] focus:border-[#a3724f]"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="lastName"
                            className="mb-1.5 block text-[11px] text-[#706963]"
                        >
                            Last Name
                        </label>

                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            placeholder="Khanna"
                            className="h-10 w-full rounded-[6px] border border-[#e6e1dc] bg-[#fdfcfb] px-3 text-[12px] text-[#211b17] outline-none transition placeholder:text-[#908983] focus:border-[#a3724f]"
                        />
                    </div>
                </div>

                {/* Email */}
                <div>
                    <label
                        htmlFor="email"
                        className="mb-1.5 block text-[11px] text-[#706963]"
                    >
                        Email
                    </label>

                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="rahul@email.com"
                        className="h-10 w-full rounded-[6px] border border-[#e6e1dc] bg-[#fdfcfb] px-3 text-[12px] text-[#211b17] outline-none transition placeholder:text-[#908983] focus:border-[#a3724f]"
                    />
                </div>

                {/* Subject */}
                <div>
                    <label
                        htmlFor="subject"
                        className="mb-1.5 block text-[11px] text-[#706963]"
                    >
                        Subject
                    </label>

                    <select
                        id="subject"
                        name="subject"
                        defaultValue="General Enquiry"
                        className="h-10 w-full rounded-[6px] border border-[#e6e1dc] bg-[#fdfcfb] px-3 text-[12px] text-[#211b17] outline-none transition focus:border-[#a3724f]"
                    >
                        <option>General Enquiry</option>
                        <option>Order Support</option>
                        <option>Custom Order</option>
                        <option>Product Enquiry</option>
                        <option>Showroom Enquiry</option>
                        <option>Feedback</option>
                    </select>
                </div>

                {/* Message */}
                <div>
                    <label
                        htmlFor="message"
                        className="mb-1.5 block text-[11px] text-[#706963]"
                    >
                        Message
                    </label>

                    <textarea
                        id="message"
                        name="message"
                        rows={5}
                        placeholder="Tell us how we can help..."
                        className="w-full resize-none rounded-[6px] border border-[#e6e1dc] bg-[#fdfcfb] px-3 py-3 text-[12px] text-[#211b17] outline-none transition placeholder:text-[#908983] focus:border-[#a3724f]"
                    />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="mt-1 flex h-10 w-full items-center justify-center gap-2 rounded-[5px] bg-[#93603e] text-[11px] font-medium tracking-[0.04em] text-white transition hover:bg-[#7f5133] active:scale-[0.99]"
                >
                    Send Message
                    <FiSend size={13} />
                </button>
            </form>
        </div>
    );
}