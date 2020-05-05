import Sequelize from "sequelize";
import { sequelize } from "../config/db.js";

const { DataTypes } = Sequelize;

const Game = sequelize.define("game", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  name: { type: DataTypes.STRING },
  date_of_release: { type: DataTypes.DATE },
  creator: { type: DataTypes.STRING },
  user_id: { type: DataTypes.INTEGER },
});

export default Game;
