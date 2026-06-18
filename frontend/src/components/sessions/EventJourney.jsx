function formatTime(timestamp) {
  return new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export default function EventJourney({ selectedSession, events, loading }) {
  return (
    <div className="rounded-xl border border-[#fcfcfc] bg-white p-5 shadow-[0_10px_40px_rgba(0,0,0,0.08)] md:rounded-card md:p-7">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-[-0.03em] text-text md:text-3xl">
            Event Journey
          </h2>

          {selectedSession ? (
            <p className="mt-2 break-all text-sm font-medium leading-6 text-text-secondary">
              Session:{" "}
              <span className="font-semibold text-primary">
                {selectedSession}
              </span>
            </p>
          ) : (
            <p className="mt-2 text-sm font-medium leading-6 text-text">
              Select a session to view events.
            </p>
          )}
        </div>
      </div>

      {!selectedSession ? (
        <div className="flex min-h-55 items-center justify-center rounded-[28px] border border-dashed border-[#dbeafe] bg-[#f8fbff] px-6 text-center text-sm font-medium text-text-secondary">
          The selected user journey will appear here in timestamp order.
        </div>
      ) : loading ? (
        <div className="flex min-h-55 items-center justify-center rounded-[28px] border border-dashed border-[#dbeafe] bg-[#f8fbff] px-6 text-center text-sm font-medium text-text-secondary">
          Loading events...
        </div>
      ) : events.length === 0 ? (
        <div className="flex min-h-55 items-center justify-center rounded-[28px] border border-dashed border-[#dbeafe] bg-[#f8fbff] px-6 text-center text-sm font-medium text-text-secondary">
          No events found for this session.
        </div>
      ) : (
        <div className="space-y-4">
          {events.map((event, index) => (
            <div
              key={`${event.timestamp}-${index}`}
              className="rounded-[28px] border border-[#eef6ff] bg-white p-4 shadow-[0_8px_24px_rgba(0,0,0,0.05)]  md:p-5"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                    {index + 1}
                  </div>

                  <div>
                    <p className="text-base font-bold capitalize text-text">
                      {event.event_type}
                    </p>
                    <p className="mt-1 text-xs font-semibold text-text-secondary">
                      {formatTime(event.timestamp)}
                    </p>
                  </div>
                </div>

                {event.event_type === "click" && (
                  <span className="w-fit rounded-full bg-[#eef6ff] px-4 py-2 text-xs font-bold text-primary">
                    x: {event.x}, y: {event.y}
                  </span>
                )}
              </div>

              <p className="mt-4 break-all rounded-2xl bg-[#f8fbff] px-4 py-3 text-xs font-medium leading-5 text-text-secondary">
                {event.page_url}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
