import React from "react";
import Predictions from "@/app/predictions/predictions";
import { LeagueData } from "@/types";

export const dynamic = "force-dynamic";

export const revalidate = 900; // revalidate every 15 minutes

interface Params {
  params: { date: string };
}

export default async function PredictionsByDatePage({ params }: Params) {
  const { date } = params;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "https://api.bookiesmasters.com"}/api/predictions?date=${date}`,
      { next: { revalidate: 900 } }
    );

    if (!res.ok) throw new Error("Failed to fetch predictions");
    const result = await res.json();
    const data: LeagueData[] = result?.data || [];

    return <Predictions initialData={data} totalDataCount={data.length} />;
  } catch (err) {
    console.error("❌ Error in ISR date page:", err);
    return (
      <div className="text-center mt-20 text-gray-500">
        Failed to load predictions for {date}.
      </div>
    );
  }
}
