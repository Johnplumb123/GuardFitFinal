import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";
import {
  FaShieldAlt,
  FaTrophy,
  FaExclamationTriangle,
  FaChartLine,
  FaListAlt,
  FaRegLightbulb,
  FaQuestionCircle,
} from "react-icons/fa";

function App() {
  const [apps, setApps] = useState([]);
  const [selectedAppName, setSelectedAppName] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Apps");

  useEffect(() => {
    fetch("https://guardfitframework.onrender.com/compare")
      .then((res) => res.json())
      .then((data) => {
        setApps(data);
        if (data.length > 0) {
          setSelectedAppName(data[0].app_name);
        }
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  const appDescriptions = {
    "Apple Health":
      "A health tracking platform that organises fitness, activity, sleep, and wellness data within the Apple ecosystem.",
    "Nike Training Club":
      "A guided workout and training app focused on exercise plans, strength sessions, mobility, and home workouts.",
    "MyFitnessPal":
      "A calorie-counting and nutrition tracking app used to log meals, monitor diet, and support weight goals.",
    "Google Fit":
      "A health and activity tracking app used to monitor movement, heart points, workouts, and overall daily fitness.",
    "Strava":
      "A social fitness tracking app focused on running and cycling, with route mapping, performance tracking, and community features.",
    "Fitbit":
      "A wearable-connected fitness app used for tracking activity, sleep, heart rate, exercise, and long-term health metrics.",
    "ASICS Runkeeper":
      "A running-focused app used to track routes, pace, goals, and training progress over time.",
  };

  const filteredApps = useMemo(() => {
    if (activeFilter === "Low Risk") {
      return apps.filter((app) => app.risk_level === "Low Risk");
    }
    if (activeFilter === "Moderate Risk") {
      return apps.filter((app) => app.risk_level === "Moderate Risk");
    }
    if (activeFilter === "High Risk") {
      return apps.filter((app) => app.risk_level === "High Risk");
    }
    return apps;
  }, [apps, activeFilter]);

  const selectedApp =
    apps.find((app) => app.app_name === selectedAppName) || apps[0] || null;

  const bestApp = apps.length ? apps[0] : null;
  const worstApp = apps.length ? apps[apps.length - 1] : null;

  const averageScore = apps.length
    ? Math.round(
        apps.reduce((sum, app) => sum + app.privacy_score, 0) / apps.length
      )
    : 0;

  const getRiskClass = (riskLevel) => {
    if (riskLevel === "Low Risk") return "badge low";
    if (riskLevel === "Moderate Risk") return "badge moderate";
    return "badge high";
  };

  const getScoreClass = (score) => {
    if (score >= 80) return "score-pill safe";
    if (score >= 50) return "score-pill moderate";
    return "score-pill unsafe";
  };

  const getBarColor = (score) => {
    if (score >= 80) return "#6fcf97";
    if (score >= 50) return "#f2c94c";
    return "#eb5757";
  };

  const getScoreCircleLabel = (score) => {
    if (score >= 80) return "LOW";
    if (score >= 50) return "MED";
    return "HIGH";
  };

  const buildSelectedSummary = (app) => {
    if (!app) return "";

    if (app.privacy_score >= 80) {
      return `${app.app_name} achieved a relatively strong privacy score because it shows fewer high-risk behaviours such as cross-service tracking, contacts access, and location-heavy data exposure.`;
    }

    if (app.privacy_score >= 50) {
      return `${app.app_name} presents a moderate privacy profile. It avoids some of the most severe risk factors, but still loses points through identifiable data use, usage monitoring, or content-related collection.`;
    }

    return `${app.app_name} received a lower privacy score because multiple higher-risk factors are present, such as tracking, location use, contacts access, or broader personal data collection.`;
  };

  return (
    <div className="page">
      <nav className="topbar">
        <div className="topbar-left">
          <div className="topbar-logo">
            <FaShieldAlt />
          </div>
          <div className="topbar-brand">GFit</div>
        </div>

        <div className="topbar-links">
          <span className="topbar-link active">Home</span>
          <span className="topbar-link">About</span>
          <span className="topbar-link help-link">
            <FaQuestionCircle /> Help
          </span>
        </div>
      </nav>

      <main className="container">
        <section className="hero-card">
          <h1>GuardFit</h1>
          <p className="hero-subtitle">Privacy comparison for fitness apps</p>

          <div className="info-banner">
            <strong>Compare popular fitness apps</strong> based on their privacy
            practices. Higher scores mean better privacy protection and lower
            exposure risk. Lower scores mean more extensive data collection,
            tracking, and linkage.
          </div>
        </section>

        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon trophy">
              <FaTrophy />
            </div>
            <div>
              <div className="stat-label">Top Ranked App</div>
              <div className="stat-value">
                {bestApp ? bestApp.app_name : "-"}
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon warning">
              <FaExclamationTriangle />
            </div>
            <div>
              <div className="stat-label">Lowest App</div>
              <div className="stat-value danger">
                {worstApp ? worstApp.app_name : "-"}
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon average">
              <FaChartLine />
            </div>
            <div>
              <div className="stat-label">Average Score</div>
              <div className="stat-value">{averageScore}/100</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon apps">
              <FaListAlt />
            </div>
            <div>
              <div className="stat-label">Apps Compared</div>
              <div className="stat-value">{apps.length}</div>
            </div>
          </div>
        </section>

        <section className="overview-grid">
          <div className="panel">
            <h2>Ranking Overview</h2>
            <p className="panel-subtext">
              Compare privacy scores of popular fitness apps.{" "}
              <strong>Higher scores</strong> mean better privacy protection.
            </p>

            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={apps}
                  margin={{ top: 10, right: 20, left: 0, bottom: 30 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="app_name"
                    interval={0}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="privacy_score" radius={[4, 4, 0, 0]}>
                    {apps.map((entry) => (
                      <Cell
                        key={entry.app_name}
                        fill={getBarColor(entry.privacy_score)}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="legend-row">
              <span className="legend-pill low">80-100 Low Risk</span>
              <span className="legend-pill moderate">
                50-79 Moderate Risk
              </span>
              <span className="legend-pill high">0-49 High Risk</span>
            </div>
          </div>

          <div className="panel insights-panel">
            <div className="insights-title">
              <FaRegLightbulb />
              <h2>Key Insights</h2>
            </div>

            <div className="insight-box">
              <strong>{bestApp ? bestApp.app_name : "Top app"}</strong> scored
              highest in this comparison, indicating comparatively lower data
              exposure and fewer invasive practices.
            </div>

            <div className="insight-box">
              <strong>{worstApp ? worstApp.app_name : "Lowest app"}</strong>{" "}
              scored lowest, reflecting broader data collection, tracking, and
              linked personal information.
            </div>

            <div className="insight-box">
              <strong>Tracking and location-related collection</strong> remain
              among the strongest contributors to lower privacy scores across
              the analysed apps.
            </div>
          </div>
        </section>

        <section className="bottom-grid">
          <div className="panel">
            <div className="table-header-row">
              <h2>App Comparison Table</h2>

              <div className="filter-row">
                {["All Apps", "Low Risk", "Moderate Risk", "High Risk"].map(
                  (filter) => (
                    <button
                      key={filter}
                      className={`filter-btn ${
                        activeFilter === filter ? "active-filter" : ""
                      }`}
                      onClick={() => setActiveFilter(filter)}
                    >
                      {filter}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>App</th>
                    <th>Score</th>
                    <th>Risk</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApps.map((app) => (
                    <tr key={app.app_name}>
                      <td>{app.rank}</td>
                      <td>{app.app_name}</td>
                      <td>
                        <span className={getScoreClass(app.privacy_score)}>
                          {app.privacy_score}/100
                        </span>
                      </td>
                      <td>
                        <span className={getRiskClass(app.risk_level)}>
                          {app.risk_level}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="panel side-panel">
            <h2>Select an app to analyze</h2>

            <select
              className="app-dropdown"
              value={selectedAppName}
              onChange={(e) => setSelectedAppName(e.target.value)}
            >
              {apps.map((app) => (
                <option key={app.app_name} value={app.app_name}>
                  {app.app_name}
                </option>
              ))}
            </select>

            {selectedApp && (
              <>
                <div className="selected-app-card">
                  <div className="selected-app-top">
                    <div className="score-circle">
                      <span className="score-circle-value">
                        {selectedApp.privacy_score}
                      </span>
                      <span className="score-circle-label">
                        {getScoreCircleLabel(selectedApp.privacy_score)}
                      </span>
                    </div>

                    <div className="selected-app-info">
                      <h3>{selectedApp.app_name}</h3>
                      <span className={getRiskClass(selectedApp.risk_level)}>
                        {selectedApp.risk_level}
                      </span>
                    </div>
                  </div>

                  <p className="selected-summary">
                    {appDescriptions[selectedApp.app_name] ||
                      "A fitness application included in the GuardFit privacy comparison."}
                  </p>

                  <p className="selected-summary">
                    {buildSelectedSummary(selectedApp)}
                  </p>
                </div>

                <div className="panel-subtext" style={{ marginTop: "8px" }}>
                  <strong>Why this app lost points:</strong>
                </div>

                {selectedApp.deductions && selectedApp.deductions.length > 0 ? (
                  selectedApp.deductions.map((item, index) => (
                    <div key={index} className="deduction-card">
                      <div className="deduction-head">
                        <div className="deduction-title">
                          <FaShieldAlt />
                          <span>{item.factor}</span>
                        </div>
                        <span className="deduction-points">
                          -{item.points}
                        </span>
                      </div>

                      <p className="deduction-description">
                        {item.description}
                      </p>
                      <p className="deduction-example">{item.example}</p>
                    </div>
                  ))
                ) : (
                  <div className="deduction-card">
                    <p className="deduction-description">
                      This app did not trigger any deduction factors in the
                      current model.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        <footer className="footer">
          GuardFit Dissertation Prototype | Built by John Plumb - 2024
        </footer>
      </main>
    </div>
  );
}

export default App;