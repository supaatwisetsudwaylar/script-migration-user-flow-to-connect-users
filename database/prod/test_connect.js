const { Sequelize } = require("sequelize");

const database = "prod";
const username = "postgres";
const password = "3LGdhu30CAoroket";
const port = 5432;
const host = "35.197.148.242";

const sequelize = new Sequelize(database, username, password, {
  host: host,
  port: port,
  dialect: "postgres",
});

(async function(){
    try {
        await sequelize.authenticate();
        console.log("Connection : " + database);
      } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
})()
