import React, { useEffect, useState } from "react";
import "./Fixtures.css";
import axiosInstance from "../utils/axiosInstance";

const Fixtures = () => {
  const [fixtures, setFixtures] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [activeDateType, setActiveDateType] = useState("today");

  const fetchFixtures = async () => {
    try {
const response = await axiosInstance.get(`/fixtures?date=${date}`);
setFixtures(response.data); 
    } catch (error) {
      console.error("Error fetching fixtures:", error);
    }
  };

  useEffect(() => {
    fetchFixtures();
  }, [date]);

  const changeDate = (offset, type) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + offset);
    setDate(newDate.toISOString().slice(0, 10));
    setActiveDateType(type);
  };

  const setToday = () => {
    const today = new Date().toISOString().slice(0, 10);
    setDate(today);
    setActiveDateType("today");
  };

  return (
    <div className="container py-0" style={{fontSize: 'clamp(12px, 2vw, 20px)'}}>
      <div className="filters">
        <button
          className={`btn ${activeDateType === "yesterday" ? "btn-teal" : "btn-inactive"}`}
          onClick={() => changeDate(-1, "yesterday")}
        >
          Yesterday
        </button>

        <button
          className={`btn ${activeDateType === "today" ? "btn-teal" : "btn-inactive"}`}
          onClick={setToday}
        >
          Today
        </button>

        <button
          className={`btn ${activeDateType === "tomorrow" ? "btn-teal" : "btn-inactive"}`}
          onClick={() => changeDate(1, "tomorrow")}
        >
          Tomorrow
        </button>
      </div>

      <div className="fixtures-grid">
        {fixtures.map((fixture) => (
          <div key={fixture.fixture.id} className="fixture-card">
            <div className="league-header">
              <img src={fixture.league.logo} alt="league-logo" />
              <span className="league-name">{fixture.league.name}</span>
            </div>

            <div className="fixture-row">
              <div className="teams">
                <span className="team-name">{fixture.teams.home.name}</span>
                <span className="vs">vs</span>
                <span className="team-name">{fixture.teams.away.name}</span>
              </div>

              <div className="match-time">
                {new Date(fixture.fixture.date).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                <br />
                <small>
                  {new Date(fixture.fixture.date).toLocaleDateString([], {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fixtures;
