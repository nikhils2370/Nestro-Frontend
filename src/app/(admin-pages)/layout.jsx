import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";
import StoreProvider from "@/redux/StoreProvider";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Nestro Admin Panel",
  description: "E-Commerce Management Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <StoreProvider>
          <AdminAuthGuard>
            <div className="flex bg-[#f8fafc]">
              <Toaster position="top-right" richColors />
              <Sidebar />
              <div className="flex-1 min-w-0">
                <Header />
                {children}
              </div>
            </div>
          </AdminAuthGuard>
        </StoreProvider>
      </body>
    </html>
  );
}
