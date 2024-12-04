const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // Course name like 'Frontend Development'
    technologies: { type: [String], required: true }, // Array of technologies ['HTML', 'CSS', 'JavaScript']
    price: { type: Number, required: true }, // Course price
    thumbnail: { type: String, required: true }, // Thumbnail URL
    description: {
      type: String,
      default: "Learn from the basics to advanced level.",
    }, // Optional description
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
