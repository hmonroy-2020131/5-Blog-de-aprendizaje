import { Router } from "express";
import { check } from "express-validator";
import { createCourse, updateCourse, deleteCourse, getCourses } from "./course.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

router.post(
    "/",
    [
        check("name", "Course name is required").not().isEmpty(),
        check("description", "Course description is required").not().isEmpty(),
        validarCampos
    ],
    createCourse
);

router.put(
    "/:id",
    [
        check("id", "Invalid course ID").isMongoId(),
        check("name", "Course name is required").not().isEmpty(),
        check("description", "Course description is required").not().isEmpty(),
        validarCampos
    ],
    updateCourse
);

router.delete(
    "/:id",
    [
        check("id", "Invalid course ID").isMongoId(),
        validarCampos
    ],
    deleteCourse
);

router.get("/", getCourses);

export default router;
