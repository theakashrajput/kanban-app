import { Router } from "express";
import { loginUser, logoutUser, registerUser, updateProfileAvatar } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(upload.single("avatar"), registerUser);

router.route("/login").post(loginUser);

router.route("/logout").post(verifyJWT, logoutUser);

router.route("/change-avatar").post(verifyJWT, upload.single("avatar"), updateProfileAvatar);

export default router;