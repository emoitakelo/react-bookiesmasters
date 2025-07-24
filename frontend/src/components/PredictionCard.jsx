import React from "react";
import { Link } from "react-router-dom";

const PredictionCard = ({ prediction }) => {
  const {
    fixtureId,
    league,
    predictions,
    teams,
    fixture,
  } = prediction;

  let matchTime = "-";
  let matchDay = "-";

  const rawDate = fixture?.date;

  if (rawDate) {
    const dateObj = new Date(rawDate);
    if (!isNaN(dateObj.getTime())) {
      matchTime = dateObj.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      });
      matchDay = dateObj.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    }
  }

  let tipText = "";

if (predictions?.winner?.comment === "Draw") {
  tipText = "Draw";
} else if (predictions?.winner?.name === teams?.home?.name) {
  tipText = `${teams.home.name} or Draw`;
} else if (predictions?.winner?.name === teams?.away?.name) {
  tipText = `${teams.away.name} or Draw`;
} else {
  tipText = predictions?.advice ?? "No tip";
}

  return (
    <Link to={`/predictions/${fixtureId}`} className="text-decoration-none text-dark">
      <div
        className="card shadow-sm rounded mb-0"
        style={{
          cursor: "pointer",
          fontSize: "0.85rem",
          padding: "0.75rem",
        }}
      >
        {/* Header */}
        <div
          className="d-flex align-items-center p-2"
          style={{ backgroundColor: "#e9e9e9" }}
        >
          {league?.flag && (
            <img
              src={league.flag}
              alt={league.country}
              style={{ height: "16px", marginRight: "6px" }}
            />
          )}
          <span className="text-uppercase small text-truncate">
            <span className="fw-bold text-dark me-1">{league?.country}:</span>
            <span className="fw-semibold" style={{ color: "rgba(0, 77, 64)" }}>
              {league?.name}
            </span>
          </span>
        </div>

        {/* Match Info */}
        <div
          className="px-2 py-2 bg-white d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2"
        >
          {/* Time */}
          <div
            className="text-center text-muted"
            style={{ minWidth: "60px", fontSize: "0.75rem" }}
          >
            <div>{matchTime}</div>
            <div>{matchDay}</div>
          </div>

          {/* Teams */}
          <div
            className="text-center"
            style={{
              minWidth: "100px",
              maxWidth: "160px",
              fontSize: "0.85rem",
            }}
          >
            <div className="fw-bold text-truncate">{teams?.home?.name ?? "-"}</div>
            <div className="text-muted" style={{ fontSize: "0.75rem" }}>
              vs
            </div>
            <div className="fw-bold text-truncate">{teams?.away?.name ?? "-"}</div>
          </div>

          {/* Tips */}
          <div className="text-center" style={{ minWidth: "90px" }}>
            <div
              className="text-nowrap border rounded px-2 py-1"
              style={{
                fontSize: "0.75rem",
                color: "#000",
                borderColor: "#ffcc80",
                backgroundColor: "#90ee90",
              }}
            >
              {tipText}
            </div>
          </div>

          {/* Probabilities */}
          <div
            className="d-flex justify-content-center text-center gap-2"
            style={{ fontSize: "0.75rem", minWidth: "0" }}
          >
            <div>
              <small className="text-muted">Home</small>
              <div className="fw-bold text-success">{predictions?.percent?.home ?? "-"}</div>
            </div>
            <div>
              <small className="text-muted">Draw</small>
              <div className="fw-bold text-warning">{predictions?.percent?.draw ?? "-"}</div>
            </div>
            <div>
              <small className="text-muted">Away</small>
              <div className="fw-bold text-danger">{predictions?.percent?.away ?? "-"}</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PredictionCard;
