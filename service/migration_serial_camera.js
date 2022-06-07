const {
  sequelize: { models: Prod },
} = require("../database/prod/models");


async function migrateSerialCamera() {
    try {

        const vehicles = await Prod.Vehicle.findAll({});

        for (let index = 0; index < vehicles.length; index++) {

            let { attributes, id } = vehicles[index];
            let attr = attributes || {};
            
            if (attr.cameraSerial) {
                await Prod.Vehicle.update({
                    mdvr_package_id: 3,
                    serial_camera: attr.cameraSerial
                }, {
                    where: {
                        id: id
                    }
                })
            }
        }

    } catch (e) {
        console.log(e);
        throw e
    }
}

module.exports = {
    migrateSerialCamera
}