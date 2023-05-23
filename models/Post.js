import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      require: true,
    },
    userName: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
    body: {
      type: String,
      require: true,
    },
    likes: {
      type: Map,
      of: Boolean,
    },
    comments:[
        {
            userId: {type: String}, 
            comment: {type: String}
        }
    ]
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);
export default Post;
