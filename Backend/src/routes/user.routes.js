import { Router } from "express";
import {
    changePassword,
    loginUser,
    logoutUser,
    refreshAccessToken,
    registerUser,
    updateProfileAvatar,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/login").post(loginUser);
router.route("/refresh-token").post(refreshAccessToken);

router.route("/logout").get(verifyJWT, logoutUser);
router.route("/change-password").post(verifyJWT, changePassword);
router.route("/register").post(upload.single("avatar"), registerUser);
router
    .route("/update-avatar")
    .post(verifyJWT, upload.single("avatar"), updateProfileAvatar);

export default router;
