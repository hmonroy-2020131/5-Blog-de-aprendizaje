import { Router } from "express";
import { check } from "express-validator";
import { createPost, updatePost, deletePost, getPosts, getPostById } from "./post.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { existingCourse } from "../helpers/db-validator.js"; 

const router = Router();

router.post(
    "/",
    [
        check("title", "Title is required").not().isEmpty(),
        check("description", "Description is required").not().isEmpty(),
        check("course", "Invalid course ID").isMongoId(),
        check("course").custom(existingCourse), 
        validarCampos
    ],
    createPost
);

router.put(
    "/:id",
    [
        check("id", "Invalid post ID").isMongoId(),
        check("title", "Title is required").not().isEmpty(),
        check("description", "Description is required").not().isEmpty(),
        check("course", "Invalid course ID").isMongoId(),
        check("course").custom(existingCourse), 
        validarCampos
    ],
    updatePost
);

router.delete(
    "/:id",
    [
        check("id", "Invalid post ID").isMongoId(),
        validarCampos
    ],
    deletePost
);

router.get("/", getPosts);

router.get("/:id", getPostById);

export default router;
