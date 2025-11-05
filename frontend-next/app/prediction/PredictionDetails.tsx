"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";
import LeagueHeader from "@/components/predictions/LeagueHeader";
import TeamDisplay from "@/components/predictions/TeamDisplay";
import PredictionAdvice from "@/components/predictions/PredictionAdvice";
import H2HSection from "@/components/predictions/H2HSection";
import LastFiveMatches from "@/components/predictions/LastFiveMatches";
import Loader from "@/components/common/Loader";

// ✅ Optional: define type for prediction details (you can expand it later)
interface MatchInfo {
  name: string;
  logo: string;
  last5Matches: any[];
}

interface LeagueInfo {
  name: string;
  logo: string;
  country: string;
}

interface PredictionDetailsData {
  league: LeagueInfo;
  fixtureId: number;
  venue?: string;
  tip?: string;
  h2h?: any[];
  homeTeam: MatchInfo;
  awayTeam: MatchInfo;
}

const PredictionDetails = () => {
  const { fixtureId } = useParams() as { fixtureId?: string };
  const [data, setData] = useState<PredictionDetailsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!fixtureId) return;
      try {
        // ✅ Axios is flattened — returns data directly
        const res = await axiosInstance.get<{ success: boolean; data: PredictionDetailsData }>(
  `/predictions/details/${fixtureId}`
);

if (res.data.success) {
  setData(res.data.data);
}

        else {
          console.error("❌ API did not return success flag");
        }
      } catch (err) {
        console.error("❌ Error fetching prediction details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [fixtureId]);

  if (loading) return <Loader size={10} color="teal-500" height="h-60" />;

  if (!data)
    return (
      <div className="text-center text-red-500 mt-10">
        No prediction details found.
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 text-gray-900">
      <LeagueHeader league={data.league} />
      <TeamDisplay fixture={data} />
      <PredictionAdvice tip={data.tip} />
      <H2HSection h2h={data.h2h} />

      <LastFiveMatches
        teamName={data.homeTeam.name}
        teamLogo={data.homeTeam.logo}
        matches={data.homeTeam.last5Matches}
      />

      <LastFiveMatches
        teamName={data.awayTeam.name}
        teamLogo={data.awayTeam.logo}
        matches={data.awayTeam.last5Matches}
      />
    </div>
  );
};

export default PredictionDetails;
