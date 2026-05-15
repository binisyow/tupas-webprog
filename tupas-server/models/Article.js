const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    fullDesc: { type: String, required: true },
    img: { type: String, required: true },
    director: { type: String, required: true },
    year: { type: String, required: true },
    genre: { type: String, required: true },
    status: { type: String, enum: ['draft', 'published'], default: 'published' },
  },
  { timestamps: true },
);

module.exports = mongoose.models.Article || mongoose.model('Article', articleSchema);
