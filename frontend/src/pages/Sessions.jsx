import { useEffect, useState } from "react";

import { api } from "../lib/api";
import SessionList from "../components/sessions/SessionList";
import EventJourney from "../components/sessions/EventJourney";
import { FiUsers } from "react-icons/fi";
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
    <div className="space-y-6 h-full">
      <div className="flex items-center gap-3">
  <div className="rounded-full bg-blue-50 p-2">
    <FiUsers className="text-xl text-primary" />
  </div>

  <div>
    <h1 className="text-3xl font-bold text-gray-900">
      Sessions View
    </h1>

    <p className="mt-2 text-gray-600">
      View tracked sessions and explore user journeys.
    </p>
  </div>
</div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}
      <div className="grid gap-6 lg:grid-cols-2">
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
    </div>
  );
}
