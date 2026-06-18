(function () {
  const API_URL = "http://localhost:5000/api/events";
  const SESSION_KEY = "trackflow_session_id";

  function generateSessionId() {
    if (window.crypto && typeof window.crypto.randomUUID === "function") {
      return window.crypto.randomUUID();
    }

    return (
      "sess_" +
      Math.random().toString(36).slice(2) +
      "_" +
      Date.now().toString(36)
    );
  }

  function getSessionId() {
    let sessionId = localStorage.getItem(SESSION_KEY);

    if (!sessionId) {
      sessionId = generateSessionId();
      localStorage.setItem(SESSION_KEY, sessionId);
    }

    return sessionId;
  }

  function sendEvent(payload) {
    console.log("Sending TrackFlow event:", payload);

    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then(async function (response) {
        const data = await response.json().catch(function () {
          return {};
        });

        if (!response.ok) {
          console.error("TrackFlow API error:", data);
        } else {
          console.log("TrackFlow event saved:", data);
        }
      })
      .catch(function (error) {
        console.error("TrackFlow request failed:", error);
      });
  }

  function createBaseEvent(eventType) {
    return {
      session_id: getSessionId(),
      event_type: eventType,
      page_url: window.location.href,
      timestamp: new Date().toISOString(),
    };
  }

  function trackPageView() {
    sendEvent(createBaseEvent("page_view"));
  }

  function trackClick(event) {
    sendEvent({
      ...createBaseEvent("click"),
      x: event.clientX,
      y: event.clientY,
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", trackPageView);
  } else {
    trackPageView();
  }

  document.addEventListener("click", trackClick);
})();

function getPageSize() {
  const body = document.body;
  const html = document.documentElement;

  return {
    page_width: Math.max(
      body.scrollWidth,
      body.offsetWidth,
      html.clientWidth,
      html.scrollWidth,
      html.offsetWidth
    ),
    page_height: Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    ),
  };
}

function trackClick(event) {
  const pageSize = getPageSize();

  sendEvent({
    ...createBaseEvent("click"),

    // Full page coordinates
    x: event.pageX,
    y: event.pageY,

    // Full page size
    page_width: pageSize.page_width,
    page_height: pageSize.page_height,
  });
}