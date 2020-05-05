import StatusModel from "../models/status.js";
import { generateRandId } from "../utils.js";

export default class StatusService {
  async getAll() {
    const foundStatuses = await StatusModel.findAll({
      order: [["id", "DESC"]],
    });

    return foundStatuses;
  }

  async create(status) {
    const newStatus = {
      id: generateRandId(),
      ...status,
    };

    const companyRecord = await StatusModel.create(newStatus);

    return companyRecord;
  }

  async update(statusId, newValues) {
    const updatedStatus = await StatusModel.update(newValues, {
      where: { id: statusId },
    });

    return updatedStatus;
  }

  async delete(userId) {
    await StatusModel.destroy({
      where: { id: userId },
    });
  }
}
