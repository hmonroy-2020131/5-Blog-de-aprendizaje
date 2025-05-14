import { Schema, model } from "mongoose";

const CommentSchema = Schema({
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: [true, "Post is required"]
    },
    authorName: {
        type: String,
        required: [true, "Author name is required"],
        maxLength: [50, "Can't exceed 50 characters"]
    },
    content: {
        type: String,
        required: [true, "Content is required"],
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

export default model('Comment', CommentSchema);
