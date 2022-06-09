const path = require('path');

const service = require('./service/migration_user_flow_to_connect_user');
const serviceVehicleEtcToOrg = require('./service/migration_vehicle_etc_to_organization');
const servicePackage = require('./service/migration_package');
const serviceSerialCamera = require('./service/migration_serial_camera');

async function main() {
    // await service.migrationUserFlowToConnectUser()

    // await serviceVehicleEtcToOrg.migrationVehicleEtcToOrganization();

    // const result = servicePackage.getDataForXlsx(path.join(__dirname, './package.xlsx'))
    // await servicePackage.migrateDataToPackage(result);

    // await serviceSerialCamera.migrateSerialCamera();

    // await serviceVehicleEtcToOrg.migrateOrganizationUnion();

    await serviceVehicleEtcToOrg.migrateNameOrganization();
}


main();