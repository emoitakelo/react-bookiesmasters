import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Predictions from "@/app/predictions/predictions";
import axiosInstance from "@/utils/axiosInstance";
import { LeagueData } from "@/types";

export const dynamic = "force-dynamic"; // always fresh SSR

export default async function HomePage() {
  try {
    // 👇 Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];

    // Fetch today's predictions only
    const res = await axiosInstance.get<{ data: LeagueData[] }>(
      `${process.env.NEXT_PUBLIC_API_URL}/predictions?date=${today}`
    );

    const allData = res?.data?.data || [];
    const initialData = allData.slice(0, 10); // 👈 progressively load more later

    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="grow">
          <Predictions
            initialData={initialData}
            totalDataCount={allData.length}
          />
        </main>
        <Footer />
      </div>
    );
  } catch (error) {
    console.error("❌ Error loading predictions:", error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-red-500">
        Failed to load predictions.
      </div>
    );
  }
}
