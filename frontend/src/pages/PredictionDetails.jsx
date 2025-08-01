import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import "./PredictionDetails.css";

const PredictionDetails = () => {
  const { fixtureId } = useParams();
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
    const res = await axiosInstance.get(`/predictions/${fixtureId}`);       
    setPrediction(res.data);
      } catch (err) {
        console.error("Failed to load prediction details", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [fixtureId]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5" style={{ fontSize: 'clamp(12px, 2vw, 20px)'}}>
        <div className="spinner-border text-success" role="status" />
      </div>
    );
  }

  if (
    !prediction ||
    !prediction.teams ||
    !prediction.fixture ||
    !prediction.league ||
    !prediction.predictions ||
    !prediction.comparison ||
    !prediction.h2h
  ) {
    return <div className="text-center mt-5">Data missing...</div>;
  }

  const { fixture, league, teams, predictions, comparison, h2h } = prediction;

  const renderComparisonBar = (label, homeValue, awayValue) => {
    const home = parseFloat(homeValue) || 0;
    const away = parseFloat(awayValue) || 0;
    const total = home + away || 1;
    const homePercent = Math.round((home / total) * 100);
    const awayPercent = 100 - homePercent;

    return (
      <div className="mb-1" style={{ fontSize: 'clamp(12px, 2vw, 20px)'}}>
        <div className="text-center mb-1 text-capitalize fw-semibold small-label">{label}</div>
        <div className="comparison-bar-container">
          <div className="comparison-bar home" style={{ width: `${homePercent}%` }}>
            {homePercent > 10 && <span>{homePercent}%</span>}
          </div>
          <div className="comparison-bar away" style={{ width: `${awayPercent}%` }}>
            {awayPercent > 10 && <span>{awayPercent}%</span>}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container my-1 prediction-details" style={{ fontSize: 'clamp(12px, 2vw, 20px)'}}>
      {/* Header Section */}
      <div className="card p-3 mb-3 shadow-sm text-center match-header">
  <h5 className=" league-name">{league.name.toUpperCase()}</h5>

  <div className="tip-box my-2 text-teal fw-bold small-text">
    Tip: {predictions.advice}
  </div>

  {/* Row: Home - Date/Time - Away */}
  <div
    className="d-flex justify-content-between align-items-center text-center flex-wrap"
    style={{ gap: "5px" }}
  >
    {/* Home */}
    <div style={{ flex: "1 1 0" }} className="d-flex flex-column align-items-center">
      <img
        src={teams.home.logo}
        alt={teams.home.name}
        style={{ width: "32px", height: "32px", objectFit: "contain" }}
      />
      <div style={{ fontSize: "11px", wordBreak: "break-word" }}>{teams.home.name}</div>
    </div>

    {/* Date + Time */}
    <div style={{ flex: "1 1 0" }} className="d-flex flex-column align-items-center">
      <div style={{ fontSize: "11px", fontWeight: "bold" }}>
        {new Date(fixture.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
      <div style={{ fontSize: "10px" }}>
        {new Date(fixture.date).toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}
      </div>
    </div>

    {/* Away */}
    <div style={{ flex: "1 1 0" }} className="d-flex flex-column align-items-center">
      <img
        src={teams.away.logo}
        alt={teams.away.name}
        style={{ width: "32px", height: "32px", objectFit: "contain" }}
      />
      <div style={{ fontSize: "11px", wordBreak: "break-word" }}>{teams.away.name}</div>
    </div>
  </div>

  {/* Venue */}
  <div className="text-muted mt-2" style={{ fontSize: "10px" }}>
    Venue: {fixture.venue?.name}
  </div>
</div>



      {/* Head to Head */}
      <div className="card p-4 mb-4 shadow-sm">
        <h5 className="teal-text text-center mb-3">HEAD TO HEAD</h5>
        <div className="h2h-list">
         {h2h.map((match, idx) => (
  <div
    key={idx}
    className={`row py-2 align-items-center ${idx % 2 === 0 ? "bg-white" : "bg-greyish"} small-text`}
  >
    {/* Mobile Layout */}
    <div className="d-block d-sm-none col-12 h2h-mobile">
      <div className="match-date">
        {new Date(match.fixture.date).toLocaleDateString()}
      </div>
      <div className="teams-line fw-bold">
        <span>{match.teams.home.name}</span>
        <span>
          {match.goals?.home ?? "-"} - {match.goals?.away ?? "-"}
        </span>
        <span>{match.teams.away.name}</span>
      </div>
    </div>

    {/* Desktop Layout */}
    <div className="d-none d-sm-block col-sm-3">
      {new Date(match.fixture.date).toLocaleDateString()}
    </div>
    <div className="d-none d-sm-block col-sm-3">{match.teams.home.name}</div>
    <div className="d-none d-sm-block col-sm-3 text-center fw-bold">
      {match.goals?.home ?? "-"} - {match.goals?.away ?? "-"}
    </div>
    <div className="d-none d-sm-block col-sm-3 text-end">{match.teams.away.name}</div>
  </div>
))}

        </div>
      </div>

      {/* Comparison */}
      <div className="card p-4 mb-1 shadow-sm">
        <h5 className="teal-text text-center mb-3">TEAM FORM COMPARISON</h5>
        <div className="d-flex justify-content-between px-3 mb-2 fw-bold text-muted comparison-header small-text">
          <div>{teams.home.name}</div>
          <div>{teams.away.name}</div>
        </div>
        {Object.entries(comparison).map(([key, val]) =>
          renderComparisonBar(key, val.home, val.away)
        )}
      </div>
    </div>
  );
};

export default PredictionDetails;
