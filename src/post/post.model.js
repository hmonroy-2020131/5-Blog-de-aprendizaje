import { Schema, model } from "mongoose";

const PostSchema = Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        maxLength: [100, "Can't exceed 100 characters"]
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        maxLength: [1000, "Can't exceed 1000 characters"]
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: [true, "Course is required"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
    versionKey: false
});

export default model('Post', PostSchema);
