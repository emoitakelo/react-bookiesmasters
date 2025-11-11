"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { LeagueData, Fixture, Team } from "@/types";
import PredictionList from "@/components/predictions/PredictionList";
import DateNavigator from "@/components/predictions/DateNavigator";
import axiosInstance from "@/utils/axiosInstance";

interface LiveScore {
  fixtureId: number;
  fullData: {
    fixture: { status: { short?: string; elapsed?: number } };
    goals: { home: number | null; away: number | null };
  };
}

interface PredictionsProps {
  initialData: LeagueData[];
  totalDataCount?: number;
}

const defaultTeam: Team = {
  id: 0,
  name: "Unknown",
  logo: "",
  score: null,
};

const Predictions: React.FC<PredictionsProps> = ({
  initialData,
  totalDataCount = 0,
}) => {
  const [predictions, setPredictions] = useState<LeagueData[]>(initialData);
  const [loading, setLoading] = useState(false);
  const [currentDate, setCurrentDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const todayISO = new Date().toISOString().split("T")[0];
  const loaderRef = useRef<HTMLDivElement | null>(null);

  /** ⚡ Live updates every 15s (only for today’s matches) */
  useEffect(() => {
    if (currentDate !== todayISO) return;

    const interval = setInterval(async () => {
      try {
        const liveRes = await axiosInstance.get<{ data: LiveScore[] }>(
          `/livescores?date=${currentDate}`
        );
        const liveData: LiveScore[] = liveRes.data?.data || [];
        if (liveData.length) {
          // Merge only live updates into existing predictions
          setPredictions((prev) =>
            prev.map((league) => ({
              ...league,
              fixtures: league.fixtures.map((fixture) => {
                const live = liveData.find((l) => l.fixtureId === fixture.fixtureId);
                if (!live) return fixture;

                const liveFixture = live.fullData.fixture;
                const isLive = !["FT", "AET", "PEN"].includes(liveFixture?.status?.short ?? "");

                const home = fixture.homeTeam ?? defaultTeam;
                const away = fixture.awayTeam ?? defaultTeam;

                return {
                  ...fixture,
                  status: isLive
                    ? liveFixture?.status?.short ?? fixture.status
                    : fixture.status,
                  minute: isLive
                    ? liveFixture?.status?.elapsed ?? fixture.minute
                    : fixture.minute,
                  displayDate: isLive
                    ? `${liveFixture?.status?.elapsed ?? ""}'`
                    : fixture.displayDate,
                  homeTeam: {
                    ...home,
                    score: isLive
                      ? live.fullData?.goals?.home ?? home.score
                      : home.score,
                  },
                  awayTeam: {
                    ...away,
                    score: isLive
                      ? live.fullData?.goals?.away ?? away.score
                      : away.score,
                  },
                } as Fixture;
              }),
            }))
          );
        }
      } catch (err) {
        console.error("❌ Error updating live scores:", err);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [currentDate, todayISO]);

  /** 📅 Handle date change */
  const handleChangeDate = async (newDate: string) => {
    setCurrentDate(newDate);
    setLoading(true);
    try {
      const res = await axiosInstance.get<{ data: LeagueData[] }>(
        `/predictions?date=${newDate}`
      );
      setPredictions(res.data?.data || []);
    } catch (err) {
      console.error("❌ Error fetching predictions:", err);
      setPredictions([]);
    } finally {
      setLoading(false);
    }
  };

  /** 🧭 Infinite scroll handler */
  const handleLoadMore = useCallback(async () => {
    if (predictions.length >= totalDataCount) return;
    try {
      const res = await axiosInstance.get<{ data: LeagueData[] }>(
        `/predictions?date=${currentDate}&skip=${predictions.length}&limit=10`
      );
      const newLeagues = res.data?.data || [];
      if (newLeagues.length === 0) return;
      setPredictions((prev) => [...prev, ...newLeagues]);
    } catch (err) {
      console.error("❌ Error loading more predictions:", err);
    }
  }, [predictions.length, currentDate, totalDataCount]);

  /** 👀 Observe the loader div */
  useEffect(() => {
    if (!loaderRef.current || loading || predictions.length >= totalDataCount)
      return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) handleLoadMore();
      },
      { threshold: 0.5 }
    );

    const current = loaderRef.current;
    observer.observe(current);

    return () => observer.unobserve(current);
  }, [handleLoadMore, loading, predictions.length, totalDataCount]);

  /** 🧩 Render */
  return (
    <div>
      <DateNavigator
        currentDate={currentDate}
        onChangeDate={handleChangeDate}
        loading={loading}
      />

      {loading ? (
        <div className="flex justify-center items-center h-40 text-gray-500">
          Loading predictions...
        </div>
      ) : predictions.length > 0 ? (
        <>
          <PredictionList predictions={predictions} />
          <div ref={loaderRef} className="h-10" />
        </>
      ) : (
        <p className="text-center text-gray-500 mt-10">
          No predictions available for this date.
        </p>
      )}
    </div>
  );
};

export default Predictions;
