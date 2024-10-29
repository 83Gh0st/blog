const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const PostSchema = new Schema({
  title: { type: String, required: true, maxlength: 100 },
  summary: { type: String, maxlength: 300 },
  content: { type: String, required: true },
  cover: { type: String, default: 'defaultCover.jpg' },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, {
  timestamps: true,
});

PostSchema.index({ author: 1 });

const PostModel = model('Post', PostSchema);

module.exports = PostModel;
