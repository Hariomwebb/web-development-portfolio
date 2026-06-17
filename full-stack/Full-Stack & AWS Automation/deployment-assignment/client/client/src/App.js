import { useEffect, useMemo, useState } from "react";
import "./App.css";

const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  (window.location.hostname === "localhost" ? "http://localhost:5000" : "");
const ACTIVE_STATUSES = ["Pending", "Running"];

function App() {
  const [form, setForm] = useState({
    clientName: "",
    domain: "",
    image: "",
  });
  const [deployment, setDeployment] = useState(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("");

  const isActive = useMemo(
    () => deployment && ACTIVE_STATUSES.includes(deployment.status),
    [deployment]
  );

  useEffect(() => {
    if (!deployment?.id || !isActive) {
      return undefined;
    }

    const pollStatus = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/status/${deployment.id}`);

        if (!response.ok) {
          throw new Error("Unable to fetch status");
        }

        const data = await response.json();
        setDeployment(data);
        setLastUpdated(new Date().toLocaleTimeString());
      } catch {
        setError("Failed to refresh deployment status.");
      }
    };

    pollStatus();
    const interval = setInterval(pollStatus, 2000);

    return () => clearInterval(interval);
  }, [deployment?.id, isActive]);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleDeploy = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);
    setDeployment(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/deploy`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const body = await response.json();
        throw new Error(body.error || "Deployment request failed");
      }

      const data = await response.json();
      setDeployment({
        id: data.id,
        status: data.status,
        clientName: form.clientName,
        domain: form.domain,
        image: form.image,
        events: [{ message: "Deployment request accepted" }],
      });
      setLastUpdated(new Date().toLocaleTimeString());
      setForm({ clientName: "", domain: "", image: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="app-shell">
      <main className="workspace">
        <section className="intro">
          <div>
            <span className="eyebrow">Admin control panel</span>
            <h1>Client Deployment Automation</h1>
          </div>
          <span className="service-dot">API: {API_BASE_URL}</span>
        </section>

        <section className="layout">
          <form onSubmit={handleDeploy} className="deploy-form">
            <div className="section-heading">
              <h2>Onboard Client</h2>
              <p>Submit a client, domain, and Docker image for background deployment.</p>
            </div>

            <label>
              Client Name
              <input
                type="text"
                value={form.clientName}
                onChange={(event) => updateField("clientName", event.target.value)}
                placeholder="Acme Cloud"
                required
              />
            </label>

            <label>
              Domain
              <input
                type="text"
                value={form.domain}
                onChange={(event) => updateField("domain", event.target.value)}
                placeholder="test.ourplatform.com"
                required
              />
            </label>

            <label>
              Docker Image
              <input
                type="text"
                value={form.image}
                onChange={(event) => updateField("image", event.target.value)}
                placeholder="nginx:latest"
                required
              />
            </label>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Queuing..." : "Deploy"}
            </button>
          </form>

          <section className="dashboard">
            <div className="section-heading">
              <h2>Live Status</h2>
              <p>Polls the API every 2 seconds while a deployment is active.</p>
            </div>

            {!deployment && (
              <div className="empty-state">No deployment submitted yet.</div>
            )}

            {deployment && (
              <div className="status-panel">
                <div className="status-summary">
                  <div>
                    <span className="label">Current Status</span>
                    <strong className={`status-chip ${deployment.status.toLowerCase()}`}>
                      {deployment.status}
                    </strong>
                  </div>
                  {lastUpdated && <span className="timestamp">Updated {lastUpdated}</span>}
                </div>

                <div className="detail-grid">
                  <span>Deployment ID</span>
                  <strong>{deployment.id}</strong>
                  <span>Client</span>
                  <strong>{deployment.clientName}</strong>
                  <span>Domain</span>
                  <strong>{deployment.domain}</strong>
                  <span>Image</span>
                  <strong>{deployment.image}</strong>
                  {deployment.jobId && (
                    <>
                      <span>Queue Job</span>
                      <strong>{deployment.jobId}</strong>
                    </>
                  )}
                </div>

                {deployment.errorMessage && (
                  <div className="notification error">{deployment.errorMessage}</div>
                )}

                <div className="events">
                  {(deployment.events || []).map((event, index) => (
                    <div className="event" key={`${event.message}-${index}`}>
                      <span />
                      <p>{event.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {error && <div className="notification error">{error}</div>}
          </section>
        </section>
      </main>
    </div>
  );
}

export default App;
