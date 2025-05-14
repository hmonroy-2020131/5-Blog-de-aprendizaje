import Course from '../course/course.model.js';
import Post from "../post/post.model.js";

export const existingCourse = async (id = '') => {
    const course = await Course.findById(id);
    if (!course) {
        throw new Error(`The course with ID ${id} does not exist 🔍❌`);
    }
};

export const existingPost = async (id = '') => {
    const post = await Post.findById(id);
    if (!post) {
        throw new Error(`The post with ID ${id} does not exist 🔍❌`);
    }
};
