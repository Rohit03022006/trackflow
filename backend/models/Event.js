const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    session_id: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    event_type: {
      type: String,
      required: true,
      enum: ["page_view", "click"],
      index: true,
    },

    page_url: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    timestamp: {
      type: Date,
      required: true,
      index: true,
    },

    x: {
      type: Number,
      min: 0,
    },

    y: {
      type: Number,
      min: 0,
    },
    page_width: {
      type: Number,
    },

    page_height: {
      type: Number,
    },
  },
  {
    versionKey: false,
  },
);

EventSchema.index({ session_id: 1, timestamp: 1 });
EventSchema.index({ page_url: 1, event_type: 1 });

module.exports = mongoose.model("Event", EventSchema);
