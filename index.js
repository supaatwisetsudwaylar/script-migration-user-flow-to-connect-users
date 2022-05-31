// let data = "JDJiJDEwJEFZby5wNGNNOGR5NVprMVJ0eXQ2bmViUnpRcXJmdmtvelNqVzM3OTNuLjRpekFndlVrdnZL"

// let buff = Buffer.from(data, 'base64');
// let text = buff.toString('ascii');
// console.log(text);

const service = require('./service/migration_user_flow_to_connect_user');
const serviceVehicleEtcToOrg = require('./service/migration_vehicle_etc_to_organization');

async function main() {
    // await service.migrationUserFlowToConnectUser()

    await serviceVehicleEtcToOrg.migrationVehicleEtcToOrganization();
}


main();