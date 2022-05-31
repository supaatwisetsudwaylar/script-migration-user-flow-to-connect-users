const { Op } = require('sequelize');
const { sequelize: { models: Prod } } = require('../database/prod/models');
const { sequelize: { models: Staging } } = require('../database/staging/models');

const findOrgID = async (userID) => {
    const orgID = await Prod.ConnectUsers.findOne({
        attributes: ["id"],
        include: [
            {
                attributes: ["organization_id"],
                model: Prod.ConnectOrganizationsUsers,
                as: "organizations"
            }
        ],
        where: {
            id : userID,
            deleted_at: null
        }
    }).then(r => r? r.organizations[0]?.organization_id: null);
    return orgID;
}

const findVehicleIDs = async (userID) => {
    const vehicleIDs = await Prod.UserFlowVehicle.findAll({
        attributes: ['vehicle_id'],
        where: {
            user_flow_id: userID
        }
    }).then(r => r[0]? r.map(n => n.vehicle_id):[]);
    return vehicleIDs
}

const findHeavyEquimentIDs = async (userID) => {
    const heavyEquimentIDs = await Prod.UserFlowHeavyEquiment.findAll({
        attributes: ['heavy_equipment_id'],
        where: {
            user_flow_id: userID
        }
    }).then(r => r[0]? r.map(n => n.heavy_equipment_id):[]);
    return heavyEquimentIDs
}

const findTrailerIDs = async (userID) => {
    const trailerIDs = await Prod.UserFlowTrailer.findAll({
        attributes: ['trailer_id'],
        where: {
            user_flow_id: userID
        }
    }).then(r => r[0]? r.map(n => n.trailer_id):[]);
    return trailerIDs
}
const migrationVehicleEtcToOrganizationByUserID = async (id) => {
    try {

        const orgID = await findOrgID(id);
        const vehicleIDs = await findVehicleIDs(id);
        const heavyEquimentIDs = await findHeavyEquimentIDs(id);
        const trailerIDs = await findTrailerIDs(id);

        if (vehicleIDs[0]) {
            
            await Prod.Vehicle.update({
                organization_id: orgID,
            }, {
                where: {
                    id: {
                        [Op.in]: vehicleIDs || []
                    }
                }
            });
        }

        if (heavyEquimentIDs[0]) {
            await Prod.HeavyEquiment.update({
                organization_id: orgID,
            }, {
                where: {
                    id: {
                        [Op.in]: heavyEquimentIDs || []
                    }
                }
            });
        }

        if (trailerIDs[0]) {
            await Prod.Trailer.update({
                organization_id: orgID,
            }, {
                where: {
                    id: {
                        [Op.in]: trailerIDs || []
                    }
                }
            });
        }

    } catch (e) {
        console.log(e);
        throw e
    }
}

const migrationVehicleEtcToOrganization = async () => {
    try {

        const userIDs = await Prod.ConnectUsers.findAll({
            attributes: ["id"],
        }).then(r => r[0]? r.map(n => n.id): []);

        for (let i = 0; i < userIDs.length; i++) {
            await migrationVehicleEtcToOrganizationByUserID(userIDs[i]);
        }

    } catch(e) {
        console.error(e);
        throw e
    }
}

module.exports = {
    migrationVehicleEtcToOrganization,
    migrationVehicleEtcToOrganizationByUserID
}