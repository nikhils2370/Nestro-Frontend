import AboutTeam from "@/components/website/about/AboutTeam";
import AboutStory from "@/components/website/about/AboutStory";
import AboutStats from "@/components/website/about/AboutStats";
import AboutValues from "@/components/website/about/AboutValues";
import Footer from "@/components/website/Footer";

export default function AboutPage() {
    return (
        <>
            <main className="min-h-screen mt-5 bg-[#faf8f5]">
                {/* Story */}
                <AboutStory />

                {/* Stats */}
                <AboutStats />

                {/* Values */}
                <AboutValues />
                {/* Team */}
                <AboutTeam />
            </main>
            <Footer />
        </>
    );
}