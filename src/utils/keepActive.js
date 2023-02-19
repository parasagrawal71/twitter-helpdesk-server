const UserModel = require("../models/user.model");
const schedule = require("node-schedule");

const keepActive = async function () {
  try {
    if (process.env.NODE_ENV !== "production") {
      appLogger.debug(
        `Inside keepActive, Keep active process is disabled for environments other than production`
      );
      return;
    }

    appLogger.debug(`Inside keepActive, Initiating keep active process...`);

    /**
     * To keep database active
     */
    const totalUsers = await UserModel.countDocuments();
    appLogger.debug(`Inside keepActive, Database: totalUsers = ${totalUsers}`);

    appLogger.debug(`Inside keepActive, Keep active process completed.`);
  } catch (error) {
    appLogger.error({ msg: `Inside keepActive, error: `, error });
    appLogger.error(`Inside keepActive, Keep active process erred.`);
  }
};

module.exports = () => {
  setTimeout(() => {
    const TIME = "0 6 * * 7"; // At 06:00 on Saturday
    // const TIME = "15 11 * * *"; // Debug Time
    const job = schedule.scheduleJob(TIME, function () {
      keepActive();
    });
  }, 3000);
};
