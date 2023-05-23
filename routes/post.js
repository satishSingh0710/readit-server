import express from "express";
import { verifyToken } from "../middlewares/auth.js";
import { getFeedPosts, getUserPosts, createPost, likePost, commentOnPost} from "../controllers/post.js";
const router = express.Router();

router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts",verifyToken, getUserPosts);
router.post("/", verifyToken, createPost);
router.patch("/:id/like", verifyToken, likePost);
router.patch("/:id/comment", verifyToken, commentOnPost); 
export default router;