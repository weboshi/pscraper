import express from "express";
import user from "../controllers/usersController"

const router = express.Router();

router.get("/:id", user.findById);
router.post("/", user.create);
router.post("/logIn", user.logIn);
router.get("/getUserPins/:username", user.getUserPins);
router.put("/update", user.updateProfile);
router.delete("/:id", user.remove);
// router.get("/auth", user.auth);
// router.put("/newPin", user.newPin);

export default router;