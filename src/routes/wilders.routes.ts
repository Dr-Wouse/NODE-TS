const router = require("express").Router();
import { Response } from "express";
import WilderController from "../controllers/wilders.controllers";

router.get("/", WilderController.getWilders);
router.get("/:id", WilderController.getWildersById);
router.post("/", WilderController.create);
router.put("/:id", WilderController.updateWilder);
router.delete("/:id", WilderController.deleteWilder);

router.use((res: Response): void => {
  res.status(404).json({ message: "Route not found" });
});

export { router as WilderRoutes };
