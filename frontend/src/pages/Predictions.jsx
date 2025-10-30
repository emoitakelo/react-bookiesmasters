import React, { useEffect, useState, useCallback } from "react";
import PredictionList from "../components/predictions/PredictionList";
import DateNavigator from "../components/predictions/DateNavigator";
import axiosInstance from "../utils/axiosInstance";

const Predictions = ({ onFixturesLoaded }) => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });

  const today = new Date();

  // Fetch merged predictions + live scores
  const fetchPredictions = useCallback(async (date) => {
    try {
      setLoading(true);

      const [predRes, liveRes] = await Promise.all([
        axiosInstance.get(`/predictions?date=${date}`),
        axiosInstance.get(`/livescores?date=${date}`),
      ]);

      const predData = predRes.data?.data || [];
      const liveData = liveRes.data?.data || [];

      // Build lookup map for live scores
      const liveMap = {};
      liveData.forEach((live) => {
        if (live && live.fixtureId) liveMap[live.fixtureId] = live;
      });

      // Merge live scores into predictions
      const merged = predData.map((league) => ({
        ...league,
        fixtures: league.fixtures.map((fixture) => {
          const live = liveMap[fixture.fixtureId];
          if (!live) return { ...fixture };

          return {
            ...fixture,
            status:
              live.status?.short ??
              (typeof fixture.status === "object" ? fixture.status.short : fixture.status),
            minute: live.status?.elapsed ?? fixture.minute,
            homeTeam: {
              ...fixture.homeTeam,
              name: live.homeTeam?.name ?? fixture.homeTeam?.name,
              logo: live.homeTeam?.logo ?? fixture.homeTeam?.logo,
              score: live.homeTeam?.score ?? fixture.homeTeam?.score ?? null,
            },
            awayTeam: {
              ...fixture.awayTeam,
              name: live.awayTeam?.name ?? fixture.awayTeam?.name,
              logo: live.awayTeam?.logo ?? fixture.awayTeam?.logo,
              score: live.awayTeam?.score ?? fixture.awayTeam?.score ?? null,
            },
          };
        }),
      }));

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

  // Smooth live updates for today's fixtures
  useEffect(() => {
    if (currentDate !== today.toISOString().split("T")[0]) return;

    const interval = setInterval(async () => {
      try {
        const liveRes = await axiosInstance.get(`/livescores?date=${currentDate}`);
        const liveData = liveRes.data?.data || [];

        if (!liveData.length) return;

        setPredictions((prevPredictions) =>
          prevPredictions.map((league) => ({
            ...league,
            fixtures: league.fixtures.map((fixture) => {
              const live = liveData.find((l) => l.fixtureId === fixture.fixtureId);
              if (!live) return fixture;

              return {
                ...fixture,
                minute: live.status?.elapsed ?? fixture.minute,
                homeTeam: {
                  ...fixture.homeTeam,
                  score: live.homeTeam?.score ?? fixture.homeTeam.score,
                },
                awayTeam: {
                  ...fixture.awayTeam,
                  score: live.awayTeam?.score ?? fixture.awayTeam.score,
                },
              };
            }),
          }))
        );
      } catch (err) {
        console.error("❌ Error updating live scores:", err);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [currentDate, today]);

  const handleChangeDate = (newDate) => {
    if (loading) return;
    setCurrentDate(newDate);
  };

  // ✅ Notify App.jsx when all fixtures have loaded
  useEffect(() => {
    if (!loading && predictions.length > 0 && onFixturesLoaded) {
      onFixturesLoaded();
    }
  }, [loading, predictions, onFixturesLoaded]);

  return (
    <main className="max-w-xl mx-auto px-1 sm:px-3">
      <DateNavigator
        currentDate={currentDate}
        onChangeDate={handleChangeDate}
        loading={loading}
      />

      {predictions.length > 0 ? (
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
