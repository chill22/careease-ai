import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CareEase AI – Free AI Support for Family Caregivers",
  description: "Free AI-powered assistant that instantly creates personalized care plans, daily schedules, and local resources for family caregivers.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gradient-to-br from-indigo-50 via-white to-teal-50 text-gray-800`}>
        {/* Top AdSense Placeholder – Horizontal banner (desktop leaderboard or mobile banner) */}
        <div className="w-full bg-gray-200 border-2 border-dashed border-gray-400 text-center py-4 text-gray-600 font-medium">
          [AdSense – Horizontal Banner 728×90 (desktop) / 320×100 (mobile)]
        </div>

        {/* Main content with max-width for readability */}
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>

        {/* Bottom AdSense Placeholder – Large rectangle (common for content sites) */}
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="bg-gray-200 border-2 border-dashed border-gray-400 text-center py-20 text-gray-600 font-medium text-lg">
            [AdSense – Rectangle 300×250 or 336×280]
          </div>
        </div>

        {/* Footer with third AdSense placeholder (optional in-content rectangle) */}
        <footer className="mt-16 bg-indigo-100 border-t border-indigo-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-indigo-700">CareEase AI</h2>
                <p className="mt-2 text-indigo-600">Free AI support for family caregivers</p>
              </div>

              <div className="bg-gray-200 border-2 border-dashed border-gray-400 text-center py-12 text-gray-600 font-medium">
                [AdSense – Medium Rectangle 300×250]
              </div>

              <div className="text-sm text-gray-600">
                <p>© 2025 CareEase AI – Made with ❤️ for caregivers everywhere</p>
                <p className="mt-2">100% free • No login required • Powered by Groq + Llama 3.1</p>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}