import React, { useEffect, useState, useCallback } from "react";
import PredictionList from "../components/predictions/PredictionList";
import DateNavigator from "../components/predictions/DateNavigator";
import Loader from "../components/common/Loader";
import axiosInstance from "../utils/axiosInstance";

const Predictions = () => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });

  const today = new Date();
  const startLimit = new Date(today);
  const endLimit = new Date(today);
  startLimit.setDate(today.getDate() - 7);
  endLimit.setDate(today.getDate() + 7);

  const canGoPrev = new Date(currentDate) > startLimit;
  const canGoNext = new Date(currentDate) < endLimit;

  const fetchPredictions = useCallback(async (date) => {
    try {
      setLoading(true);

      const [predRes, liveRes] = await Promise.all([
        axiosInstance.get(`/predictions?date=${date}`),
        axiosInstance.get(`/livescores?date=${date}`),
      ]);

      const predData = predRes.data?.data || [];
      const liveData = liveRes.data?.data || [];

      // build lookup map for quick access
      const liveMap = {};
      liveData.forEach((live) => {
        if (live && live.fixtureId) liveMap[live.fixtureId] = live;
      });

      // Merge live.goals -> fixture.homeTeam.score / awayTeam.score
      const merged = predData.map((league) => ({
        ...league,
        fixtures: league.fixtures.map((fixture) => {
          const live = liveMap[fixture.fixtureId];
          if (!live) {
            // clone fixture to preserve reference safety
            return { ...fixture };
          }

          // Use goals from live object explicitly (don't default to 0)
          const liveHome = live.homeTeam?.score;
const liveAway = live.awayTeam?.score;

          return {
            ...fixture,
            // status should be a string (your card expects status or status.short)
            // Some of your code expects `status` to be a string (statusShort) so set it to short directly
            status: live.status?.short ?? (typeof fixture.status === "object" ? fixture.status.short : fixture.status),
            // minute used by the card
            minute: live.status?.elapsed ?? fixture.minute,
            homeTeam: {
              // keep existing metadata but override name/logo/score if live provides it
              ...fixture.homeTeam,
              name: live.teams?.home?.name ?? fixture.homeTeam?.name,
              logo: live.teams?.home?.logo ?? fixture.homeTeam?.logo,
              score:
                liveHome !== null && liveHome !== undefined
                  ? liveHome
                  : fixture.homeTeam?.score ?? null,
            },
            awayTeam: {
              ...fixture.awayTeam,
              name: live.teams?.away?.name ?? fixture.awayTeam?.name,
              logo: live.teams?.away?.logo ?? fixture.awayTeam?.logo,
              score:
                liveAway !== null && liveAway !== undefined
                  ? liveAway
                  : fixture.awayTeam?.score ?? null,
            },
          };
        }),
      }));

      // Optional debug: uncomment while testing
      // console.log("✅ merged (sample):", merged.slice(0,2));

      setPredictions(merged);
    } catch (err) {
      console.error("❌ Error fetching predictions/livescores:", err);
      setPredictions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPredictions(currentDate);
  }, [currentDate, fetchPredictions]);

  // Auto-refresh for today (you can change interval)
  useEffect(() => {
    if (currentDate === today.toISOString().split("T")[0]) {
      const interval = setInterval(() => fetchPredictions(currentDate), 30000); // 30s for snappier updates
      return () => clearInterval(interval);
    }
  }, [currentDate, fetchPredictions]);

  const handleChangeDate = (newDate) => {
    if (loading) return;
    setCurrentDate(newDate);
  };

  return (
    <main className="max-w-3xl mx-auto px-1 sm:px-3">
      <DateNavigator
        currentDate={currentDate}
        onChangeDate={handleChangeDate}
        loading={loading}
        canGoPrev={canGoPrev}
        canGoNext={canGoNext}
      />

      {loading ? (
        <Loader size={10} color="teal-500" height="h-40" />
      ) : predictions.length > 0 ? (
        <PredictionList predictions={predictions} />
      ) : (
        <p className="text-center text-gray-500">
          No predictions available for this date.
        </p>
      )}
    </main>
  );
};

export default Predictions;
