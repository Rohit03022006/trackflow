import { useEffect, useState } from "react";

import { api } from "../lib/api";
import SessionList from "../components/sessions/SessionList";
import EventJourney from "../components/sessions/EventJourney";

export default function Sessions() {
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState("");
  const [events, setEvents] = useState([]);

  const [loadingSessions, setLoadingSessions] = useState(true);
  const [loadingEvents, setLoadingEvents] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    async function loadSessions() {
      try {
        setLoadingSessions(true);
        setError("");

        const res = await api.get("/sessions");
        setSessions(res.data);
        // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError("Unable to load sessions.");
      } finally {
        setLoadingSessions(false);
      }
    }

    loadSessions();
  }, []);

  async function handleSessionClick(sessionId) {
    try {
      setSelectedSession(sessionId);
      setLoadingEvents(true);
      setError("");

      const res = await api.get(`/sessions/${encodeURIComponent(sessionId)}`);
      setEvents(res.data);
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("Unable to load session events.");
    } finally {
      setLoadingEvents(false);
    }
  }

  return (
    <section className="space-y-8 p4">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <span className="mb-4 inline-flex rounded-full bg-[#eef6ff] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
            User Journey
          </span>

          <h1 className="text-xl font-bold tracking-[-0.04em] text-text md:text-5xl lg:text-[54px] lg:leading-[1.15]">
            Sessions View
          </h1>

          <p className="mt-4 max-w-2xl text-base font-medium leading-7 text-text-secondary md:text-lg">
            View tracked sessions and click a session to see the user journey in
            timestamp order.
          </p>
        </div>

        <div className="w-full rounded-[28px] border border-[#fcfcfc] bg-[#f8fbff] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.06)] sm:w-55 md:rounded-[36px]">
          <p className="text-sm font-bold text-text-secondary">Total Sessions</p>
          <p className="mt-2 text-4xl font-black tracking-[-0.04em] text-primary">
            {sessions.length}
          </p>
        </div>
      </div>

      {error && (
        <div className="rounded-3xl border border-red-100 bg-red-50 px-5 py-4 text-sm font-semibold text-red-600">
          {error}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.4fr]">
        <SessionList
          sessions={sessions}
          selectedSession={selectedSession}
          loading={loadingSessions}
          onSessionClick={handleSessionClick}
        />

        <EventJourney
          selectedSession={selectedSession}
          events={events}
          loading={loadingEvents}
        />
      </div>
    </section>
  );
}
