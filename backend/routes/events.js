const router = require("express").Router();
const Event = require("../models/Event");

// POST /api/events
router.post("/events", async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json({
      success: true,
      event,
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
});

// GET /api/sessions
router.get("/sessions", async (req, res) => {
  try {
    const sessions = await Event.aggregate([
      {
        $group: {
          _id: "$session_id",
          event_count: { $sum: 1 },
          last_activity: { $max: "$timestamp" },
        },
      },
      {
        $project: {
          _id: 0,
          session_id: "$_id",
          event_count: 1,
          last_activity: 1,
        },
      },
      {
        $sort: {
          last_activity: -1,
        },
      },
    ]);

    res.json(sessions);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// GET /api/sessions/:sessionId
router.get("/sessions/:sessionId", async (req, res) => {
  try {
    const events = await Event.find({
      session_id: req.params.sessionId,
    })
      .sort({ timestamp: 1 })
      .select("event_type timestamp page_url x y -_id");

    res.json(events);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// GET /api/heatmap?page=<page_url>
router.get("/heatmap", async (req, res) => {
  try {
    const { page } = req.query;

    if (!page) {
      return res.status(400).json({
        error: "page param required",
      });
    }

    const clicks = await Event.find({
      event_type: "click",
      page_url: page,
    }).select("x y page_width page_height -_id");

    res.json(clicks);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// GET /api/heatmap/pages
router.get("/heatmap/pages", async (req, res) => {
  try {
    const pages = await Event.distinct("page_url", {
      event_type: "click",
    });

    res.json(pages);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// GET /api/heatmap?page=<page_url>
router.get("/heatmap", async (req, res) => {
  try {
    const { page } = req.query;

    if (!page) {
      return res.status(400).json({
        error: "page param required",
      });
    }

    const clicks = await Event.find({
      event_type: "click",
      page_url: page,
    }).select("x y -_id");

    res.json(clicks);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

module.exports = router;
