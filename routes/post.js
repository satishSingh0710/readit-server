import express from "express";
import { verifyToken } from "../middlewares/auth";
import { getFeedPosts, getUserPosts, createPost, likePost} from "../controllers/post";
const router = express.Router();

router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);
router.post("/", verifyToken, createPost);
router.patch("/:id/like", verifyToken, likePost); 
export default router;