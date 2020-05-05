import express from "express";
import typedi from "typedi";
import StatusService from "../services/status.service.js";

const router = express.Router();
const { Container } = typedi;

router.get("/", async (req, res, next) => {
  try {
    const statusService = Container.get(StatusService);

    const status = await statusService.getAll();

    return res.json(status);
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const statusService = Container.get(StatusService);

    const service = req.body;

    await statusService.create(service);

    return res.sendStatus(200);
  } catch (e) {
    next(e);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const statusService = Container.get(StatusService);

    const id = req.params.id;

    const updateValues = req.body;

    await statusService.update(id, updateValues);

    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const statusService = Container.get(StatusService);

    const statusId = req.params.id;

    await statusService.delete(statusId);

    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
});

export default router;
