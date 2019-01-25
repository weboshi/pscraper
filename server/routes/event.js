import express from "express";
import event from "../controllers/eventsController"

const router = express.Router();


router.post("/", event.create);
router.put("/update", event.update);
router.get("/getEvents", event.findAll);




export default router;