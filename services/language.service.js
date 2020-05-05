import LanguageModel from "../models/game.js";
import { generateRandId } from "../utils.js";

export default class LanguageService {
  async getAll() {
    const foundLanguages = await LanguageModel.findAll({
      order: [["id", "DESC"]],
    });

    return foundLanguages;
  }

  async create(language) {
    const newLanguage = {
      id: generateRandId(),
      ...language,
    };

    const languageRecord = await LanguageModel.create(newLanguage);

    return languageRecord;
  }

  async update(languageId, newValues) {
    const updatedLanguage = await LanguageModel.update(newValues, {
      where: { id: languageId },
    });

    return updatedLanguage;
  }

  async delete(languageId) {
    await LanguageModel.destroy({
      where: { id: languageId },
    });
  }
}
