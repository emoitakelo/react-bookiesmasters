import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Predictions from "@/app/predictions/predictions";
import axiosInstance from "@/utils/axiosInstance";
import { LeagueData, LiveScore, Fixture } from "@/types";

/** 
 * ISR: Regenerate this page every 15 seconds
 * You can adjust the interval as needed
 */
export const dynamic = "force-dynamic";
export const revalidate = 15; // optional, if you still want ISR

/** 
 * Helper to merge predictions + live scores on the server
 */
const mergeLiveScores = (predData: LeagueData[], liveData: LiveScore[]): LeagueData[] => {
  const liveMap: Record<number, LiveScore> = {};
  liveData.forEach((live) => {
    if (live?.fixtureId) liveMap[live.fixtureId] = live;
  });

  return predData.map((league) => ({
    ...league,
    fixtures: league.fixtures.map((fixture) => {
      const live = liveMap[fixture.fixtureId];
      if (!live) return fixture;

      const liveFixture = live.fullData.fixture;
      const isLive = !["FT", "AET", "PEN"].includes(liveFixture?.status?.short ?? "");

      const home = fixture.homeTeam ?? { id: 0, name: "Unknown", logo: "", score: null };
      const away = fixture.awayTeam ?? { id: 0, name: "Unknown", logo: "", score: null };

      return {
        ...fixture,
        status: isLive ? liveFixture?.status?.short ?? fixture.status : fixture.status,
        minute: isLive ? liveFixture?.status?.elapsed ?? fixture.minute : fixture.minute,
        displayDate: isLive ? `${liveFixture?.status?.elapsed ?? ""}'` : fixture.displayDate,
        homeTeam: { ...home, score: isLive ? live.fullData?.goals?.home ?? home.score : home.score },
        awayTeam: { ...away, score: isLive ? live.fullData?.goals?.away ?? away.score : away.score },
      } as Fixture;
    }),
  }));
};

export default async function HomePage() {
  try {
    const today = new Date().toISOString().split("T")[0];

    // 1️⃣ Fetch predictions for today
    const predRes = await axiosInstance.get<{ data: LeagueData[] }>(
      `${process.env.NEXT_PUBLIC_API_URL}/predictions?date=${today}`
    );
    const allPredictions = predRes.data?.data || [];

    // 2️⃣ Fetch latest live scores for today
    const liveRes = await axiosInstance.get<{ data: LiveScore[] }>(
      `${process.env.NEXT_PUBLIC_API_URL}/livescores?date=${today}`
    );
    const liveData = liveRes.data?.data || [];

    // 3️⃣ Merge live scores into predictions
    const mergedData = mergeLiveScores(allPredictions, liveData);

    // 4️⃣ Pass initial slice for progressive loading
    const initialData = mergedData.slice(0, 10);

    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="grow">
          <Predictions
            initialData={initialData}
            totalDataCount={mergedData.length}
          />
        </main>
        <Footer />
      </div>
    );
  } catch (error) {
    console.error("❌ Error loading predictions + live scores:", error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-red-500">
        Failed to load predictions.
      </div>
    );
  }
}
