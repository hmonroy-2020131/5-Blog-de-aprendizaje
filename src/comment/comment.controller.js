import { response } from "express";
import Comment from "./comment.model.js";
import Post from "../post/post.model.js"; 

export const createComment = async (req, res = response) => {
    try {
        const { post, authorName, content } = req.body;

        const existingPost = await Post.findById(post);
        if (!existingPost) {
            return res.status(404).json({
                success: false,
                msg: "Post not found 🔍❌"
            });
        }

        const newComment = new Comment({
            post,
            authorName,
            content
        });

        await newComment.save();

        res.status(201).json({
            success: true,
            msg: "Comment created successfully 🎉",
            comment: newComment
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: "Error creating comment ❌",
            error
        });
    }
};

export const updateComment = async (req, res = response) => {
    try {
        const { id } = req.params;
        const { authorName, content } = req.body;

        const comment = await Comment.findById(id);
        if (!comment) {
            return res.status(404).json({
                success: false,
                msg: "Comment not found 🔍❌"
            });
        }

        comment.authorName = authorName || comment.authorName;
        comment.content = content || comment.content;

        await comment.save();

        res.status(200).json({
            success: true,
            msg: "Comment updated successfully ✅",
            comment
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: "Error updating comment ❌",
            error
        });
    }
};

export const deleteComment = async (req, res = response) => {
    try {
        const { id } = req.params;

        const comment = await Comment.findById(id);
        if (!comment) {
            return res.status(404).json({
                success: false,
                msg: "Comment not found 🔍❌"
            });
        }

        await comment.deleteOne();

        res.status(200).json({
            success: true,
            msg: "Comment deleted successfully 🗑️🎉"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: "Error deleting comment ❌",
            error
        });
    }
};

export const listCommentsByPost = async (req, res = response) => {
    try {
        const { postId } = req.params;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({
                success: false,
                msg: "Post not found 🔍❌"
            });
        }

        const comments = await Comment.find({ post: postId });

        res.status(200).json({
            success: true,
            comments
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: "Error fetching comments ❌",
            error
        });
    }
};
