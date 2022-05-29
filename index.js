// let data = "JDJiJDEwJEFZby5wNGNNOGR5NVprMVJ0eXQ2bmViUnpRcXJmdmtvelNqVzM3OTNuLjRpekFndlVrdnZL"

// let buff = Buffer.from(data, 'base64');
// let text = buff.toString('ascii');
// console.log(text);

const service = require('./service/migration_user_flow_to_connect_user');

async function main() {
    await service.migrationUserFlowToConnectUserByUserFlowID(6)
}


main();