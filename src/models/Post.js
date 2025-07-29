import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  user: String,
  comment: String,
  createdAt: { type: Date, default: Date.now },
});

const postSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    tags: [String],
    authorEmail: String,
    authorName: String,
    likes: [String], // array of user emails
    comments: [commentSchema],
  },
  { timestamps: true }
);

export default mongoose.models.Post || mongoose.model("Post", postSchema);
