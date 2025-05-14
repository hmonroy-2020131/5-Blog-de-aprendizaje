import { Router } from "express";
import { check } from "express-validator";
import { createComment, updateComment, deleteComment, listCommentsByPost } from "./comment.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { existingPost } from "../helpers/db-validator.js"; 

const router = Router();

router.post(
    "/",
    [
        check("post", "Invalid post ID").isMongoId(),
        check("post").custom(existingPost),
        check("authorName", "Author name is required").not().isEmpty(),
        check("content", "Content is required").not().isEmpty(),
        validarCampos
    ],
    createComment
);

router.put(
    "/:id",
    [
        check("id", "Invalid comment ID").isMongoId(),
        check("authorName", "Author name is required").not().isEmpty(),
        check("content", "Content is required").not().isEmpty(),
        validarCampos
    ],
    updateComment
);

router.delete(
    "/:id",
    [
        check("id", "Invalid comment ID").isMongoId(),
        validarCampos
    ],
    deleteComment
);

router.get("/post/:postId", 
    [
        check("postId", "Invalid post ID").isMongoId(),
        check("postId").custom(existingPost),
        validarCampos
    ], 
    listCommentsByPost
);

export default router;
