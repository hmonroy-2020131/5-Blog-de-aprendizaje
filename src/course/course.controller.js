import { response } from "express";
import Course from "./course.model.js";

export const createCourse = async (req, res = response) => {
    try {
        const { name, description } = req.body;

        const newCourse = new Course({
            name,
            description
        });

        await newCourse.save();

        res.status(201).json({
            success: true,
            msg: "Course created successfully 🎉",
            course: newCourse
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: "Error creating course ❌",
            error
        });
    }
};

export const updateCourse = async (req, res = response) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({
                success: false,
                msg: "Course not found 🔍❌"
            });
        }

        course.name = name || course.name;
        course.description = description || course.description;

        await course.save();

        res.status(200).json({
            success: true,
            msg: "Course updated successfully ✅",
            course
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: "Error updating course ❌",
            error
        });
    }
};

export const deleteCourse = async (req, res = response) => {
    try {
        const { id } = req.params;

        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({
                success: false,
                msg: "Course not found 🔍❌",
            });
        }

        await course.deleteOne();

        res.status(200).json({
            success: true,
            msg: "Course deleted successfully 🗑️🎉",
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: "Error deleting course ❌",
            error
        });
    }
};

export const getCourses = async (req, res = response) => {
    try {
        const courses = await Course.find();

        res.status(200).json({
            success: true,
            courses
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: "Error fetching courses ❌",
            error
        });
    }
};
