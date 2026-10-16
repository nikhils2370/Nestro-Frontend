import ContactHero from "@/components/website/contact/ContactHero";
import ContactInfo from "@/components/website/contact/ContactInfo";
import ContactMap from "@/components/website/contact/ContactMap";
import ContactForm from "@/components/website/contact/ContactForm";
import ContactShowrooms from "@/components/website/contact/ContactShowrooms";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-[#faf8f5]">
            {/* Hero */}
            <ContactHero />

            {/* Main Contact Area */}
            <section className="px-4 py-8 sm:px-6 lg:px-7 lg:py-9">
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(300px,0.75fr)_minmax(500px,1fr)]">

                    <div className="flex flex-col gap-4">
                        <ContactInfo />

                        <ContactMap />

                        <ContactShowrooms />
                    </div>
                    <ContactForm />
                </div>
            </section>
        </main>
    );
}