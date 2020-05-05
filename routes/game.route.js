import express from "express";
import typedi from "typedi";
import GameService from "../services/game.service.js";

const router = express.Router();
const { Container } = typedi;

router.get("/", async (req, res, next) => {
  try {
    const gameService = Container.get(GameService);

    const games = await gameService.getAll();

    return res.json(games);
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const gameService = Container.get(GameService);

    const game = req.body;

    await gameService.create(game);

    return res.sendStatus(200);
  } catch (e) {
    next(e);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const gameService = Container.get(GameService);

    const id = req.params.id;

    const updateValues = req.body;

    await gameService.update(id, updateValues);

    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const gameService = Container.get(GameService);

    const gameId = req.params.id;

    await gameService.delete(gameId);

    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
});

export default router;
