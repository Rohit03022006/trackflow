(function () {
  const API_URL = "https://trackflow-podh.onrender.com/api/events";
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
    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).catch(console.error);
  }

  function createBaseEvent(eventType) {
    return {
      session_id: getSessionId(),
      event_type: eventType,
      page_url: window.location.href,
      timestamp: new Date().toISOString(),
    };
  }

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

  function trackPageView() {
    const pageSize = getPageSize();

    sendEvent({
      ...createBaseEvent("page_view"),
      page_width: pageSize.page_width,
      page_height: pageSize.page_height,
    });
  }

  function trackClick(event) {
    const pageSize = getPageSize();

    sendEvent({
      ...createBaseEvent("click"),
      x: event.pageX,
      y: event.pageY,
      page_width: pageSize.page_width,
      page_height: pageSize.page_height,
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", trackPageView);
  } else {
    trackPageView();
  }

  document.addEventListener("click", trackClick);
})();
