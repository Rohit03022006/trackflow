export default function SessionList({
  sessions,
  selectedSession,
  loading,
  onSessionClick,
}) {
  return (
    <div className="rounded-xl border border-[#fcfcfc] bg-white p-5 shadow-[0_10px_40px_rgba(0,0,0,0.08)] md:rounded-card md:p-7">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-[-0.03em] text-text md:text-3xl">
            Sessions
          </h2>
          <p className="mt-2 text-sm font-medium text-text-secondary">
            Select a session
          </p>
        </div>

        <span className="rounded-full bg-[#eef6ff] px-4 py-2 text-xs font-bold text-primary">
          {sessions.length} total
        </span>
      </div>

      {loading ? (
        <div className="flex min-h-55 items-center justify-center rounded-[28px] border border-dashed border-[#dbeafe] bg-[#f8fbff] px-6 text-center text-sm font-medium text-text-secondary">
          Loading sessions...
        </div>
      ) : sessions.length === 0 ? (
        <div className="flex min-h-55 items-center justify-center rounded-[28px] border border-dashed border-[#dbeafe] bg-[#f8fbff] px-6 text-center text-sm font-medium leading-6 text-text-secondary">
          No sessions found. Open demo page and click around to generate events.
        </div>
      ) : (
        <div className="space-y-4">
          {sessions.map((session) => {
            const active = selectedSession === session.session_id;

            return (
              <button
                key={session.session_id}
                type="button"
                onClick={() => onSessionClick(session.session_id)}
                className={[
                  "w-full rounded-[28px] border p-4 text-left transition duration-200 md:p-5",
                  active
                    ? "border-primary bg-[#eef6ff] shadow-[0_16px_36px_rgba(0,137,247,0.18)]"
                    : "border-[#eef6ff] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.05)] hover:-translate-y-0.5 hover:border-primary/30",
                ].join(" ")}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <p
                      className={[
                        "break-all text-sm font-bold leading-6",
                        active ? "text-primary" : "text-text",
                      ].join(" ")}
                    >
                      {session.session_id}
                    </p>

                    <p className="mt-1 text-xs font-semibold text-text-secondary">
                      Click to view journey
                    </p>
                  </div>

                  <span
                    className={[
                      "w-fit shrink-0 rounded-full px-4 py-2 text-xs font-bold",
                      active
                        ? "bg-primary text-white shadow-[0_12px_28px_rgba(0,137,247,0.25)]"
                        : "bg-[#eef6ff] text-primary",
                    ].join(" ")}
                  >
                    {session.event_count} events
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}