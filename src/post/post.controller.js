import { response } from "express";
import Post from "./post.model.js";
import Course from "../course/course.model.js"; 

export const createPost = async (req, res = response) => {
    try {
        const { title, description, course } = req.body;

        const existingCourse = await Course.findById(course);
        if (!existingCourse) {
            return res.status(404).json({
                success: false,
                msg: "Course not found 🔍❌"
            });
        }

        const newPost = new Post({
            title,
            description,
            course
        });

        await newPost.save();

        res.status(201).json({
            success: true,
            msg: "Post created successfully 🎉",
            post: newPost
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: "Error creating post ❌",
            error
        });
    }
};

export const updatePost = async (req, res = response) => {
    try {
        const { id } = req.params;
        const { title, description, course } = req.body;

        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({
                success: false,
                msg: "Post not found 🔍❌"
            });
        }

        const existingCourse = await Course.findById(course);
        if (!existingCourse) {
            return res.status(404).json({
                success: false,
                msg: "Course not found 🔍❌"
            });
        }

        post.title = title || post.title;
        post.description = description || post.description;
        post.course = course || post.course;

        await post.save();

        res.status(200).json({
            success: true,
            msg: "Post updated successfully ✅",
            post
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: "Error updating post ❌",
            error
        });
    }
};

export const deletePost = async (req, res = response) => {
    try {
        const { id } = req.params;

        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({
                success: false,
                msg: "Post not found 🔍❌"
            });
        }

        await post.deleteOne();

        res.status(200).json({
            success: true,
            msg: "Post deleted successfully 🗑️🎉"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: "Error deleting post ❌",
            error
        });
    }
};

export const getPosts = async (req, res) => {
  try {
    const { course } = req.query;

    let filter = {};

    if (course) {
      
      const foundCourse = await Course.findOne({ name: { $regex: `^${course}$`, $options: "i" } });
      if (!foundCourse) {
        return res.status(404).json({
          success: false,
          msg: `Curso '${course}' no encontrado`,
        });
      }
      filter.course = foundCourse._id;
    }

    const posts = await Post.find(filter).populate("course", "name description");

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: "Error obteniendo publicaciones",
      error: error.message || error,
    });
  }
};