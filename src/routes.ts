import { Router } from "express";

import IoTController from "./controllers/Iot/Instant";

const router = Router();
router.post("newData/", IoTController.create);

export { router };
