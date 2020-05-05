import GameModel from "../models/game.js";
import { generateRandId } from "../utils.js";

export default class LanguageService {
  async getAll() {
    const foundGames = await GameModel.findAll({
      order: [["id", "DESC"]],
    });

    return foundGames;
  }

  async create(game) {
    const newGame = {
      id: generateRandId(),
      ...game,
    };

    const gameRecord = await GameModel.create(newGame);

    return gameRecord;
  }

  async update(gameId, newValues) {
    return GameModel.update(newValues, {
      where: { id: gameId },
    });
  }

  async delete(gameId) {
    await GameModel.destroy({
      where: { id: gameId },
    });
  }
}
