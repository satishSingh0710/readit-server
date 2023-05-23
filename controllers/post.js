import Post from "../models/Post.js";
import User from "../models/User.js";

// initially post with 0 likes and 0 comments
// once post is saved, fetch all the posts and send to the front end
export const createPost = async (req, res) => {
  try {
    const { userId, title, body } = req.body;
    console.log(userId);
    const user = await User.findById(userId);
    const newPost = new Post({
      userId: userId,
      userName: user.userName,
      title: title,
      body: body,
      likes: {},
      comments: [],
    });
    await newPost.save();
    const posts = await Post.find();
    return res.status(201).json({ posts });
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// simple,  just get all the posts that are stored in your database
export const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    return res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// check for the posts where userId matches with the id of logged in user
export const getUserPosts = async (req, res) => {
  try {
    // console.log("Inside get req for posts");
    console.log(req.params);
    const { userId } = req.params;
    const userPosts = await Post.find({ userId });
    res.status(200).json({ userPosts });
  } catch (error) {
    console.log("There is an error here");
    res.status(404).json({ error: error.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    // instead of .get I can also use .has method, but it is more convenient
    const isLiked = post.likes.get({ userId });
    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    // new: true => it will give me the updated post,
    // if I don't use it then the post will be updated but I'll get the previous value of it.
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );
    res.status(201).json({ updatedPost });
  } catch (error) {
    res.status(501).json({ error: error.message });
  }
};

// comments feature
// I'm mapping userID with the comments made on any given post
export const commentOnPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, comment } = req.body;
    const post = await Post.findById(id);

    // const updatedComment = await Post.findByIdAndUpdate(
    //   id,
    //   { comments: post.comments },
    //   { new: true }
    // );
    const newComment = {
      userId: userId,
      comment: comment,
    };
    post.comments.push(newComment);
    const updatedComment = await Post.findByIdAndUpdate(
      id,
      {
        comments: post.comments,
      },
      { new: true }
    );
    res.status(201).json({ updatedComment });
  } catch (error) {
    res.status(501).json({ error: error.message });
  }
};
