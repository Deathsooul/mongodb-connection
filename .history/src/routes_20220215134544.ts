import { Router } from "express";

import IoTController from "./controllers/Iot/Instant";

const router = Router();
router.post("/plants/newData/livioTemp", IoTController.create);
