import express from "express";
import typedi from "typedi";
import LanguageService from "../services/language.service.js";

const router = express.Router();
const { Container } = typedi;

router.get("/", async (req, res, next) => {
  try {
    const languageService = Container.get(LanguageService);

    const languages = await languageService.getAll();

    return res.json(languages);
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const languagesService = Container.get(LanguageService);

    const service = req.body;

    await languagesService.create(service);

    return res.sendStatus(200);
  } catch (e) {
    next(e);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const languageService = Container.get(LanguageService);

    const id = req.params.id;

    const updateValues = req.body;

    await languageService.update(id, updateValues);

    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const languageService = Container.get(LanguageService);

    const languageId = req.params.id;

    await languageService.delete(languageId);

    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
});

export default router;
