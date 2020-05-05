import Sequelize from "sequelize";
import { sequelize } from "../config/db.js";

const { DataTypes } = Sequelize;

const Languages = sequelize.define("languages", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  name: { type: DataTypes.STRING },
  is_available: { type: DataTypes.BOOLEAN },
  user_id: { type : DataTypes.INTEGER },
  game_id: { type : DataTypes.INTEGER }
});

export default Languages;
