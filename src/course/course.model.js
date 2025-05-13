import { Schema, model } from "mongoose";

const CourseSchema = Schema({
    name: {
        type: String,
        required: [true, "Course name is required"],
        maxLength: [100, "Can't exceed 100 characters"]
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        maxLength: [500, "Can't exceed 500 characters"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
    versionKey: false
});

export default model('Course', CourseSchema);
