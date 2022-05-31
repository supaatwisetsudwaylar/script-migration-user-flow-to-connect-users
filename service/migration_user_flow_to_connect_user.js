const { sequelize: { models: Prod } } = require('../database/prod/models');
const { sequelize: { models: Staging } } = require('../database/staging/models');

const moment = require('moment');
const { v4: uuidV4 } = require('uuid');
const migrationUserFlowToConnectUserByUserFlowID = async (id) => {
    try {

        const dateNow = moment().unix();
        const userFlow = await Prod.UserFlow.findOne({
            include: [
                {
                    model: Prod.Customer,
                    as: "customer",
                    include: [
                        {
                            model: Prod.Contact,
                            as: "contact",
                        }
                    ]
                },
                {
                    model: Prod.Contact,
                    as: "contact",
                    include: [
                        {
                            model: Prod.TitleName,
                            as: "title_name"
                        }
                    ]
                }
            ],
            where: {
                id
            }
        });

        if (!userFlow) return;

        const isExistsUser = await Staging.ConnectUsers.findOne({
            attributes: ["id"],
            where: {
                id: userFlow.id
            }
        }).then(r => r? true: false);
        if (isExistsUser) return;

        const connectUser = await Staging.ConnectUsers.create({
            id: userFlow.id,
            username: userFlow.username,
            hashed_password: userFlow.hashed_password,
            is_active: userFlow.enable,
            max_session: userFlow.max_session == -1? 1: userFlow.max_session,
            is_verify: false,
            is_kyc: false,
            metadata: userFlow.metadata,
            platform: "connect",
            created_at: dateNow,
        });

        await Staging.ConnectProfiles.create({
            title: userFlow?.contact?.title_name?.initials_th || null,
            first_name: userFlow.contact? (userFlow.contact?.firstname || null) : (userFlow.customer?.contact?.firstname || null),
            middle_name: null,
            last_name: userFlow.contact? (userFlow.contact?.lastname || null) : (userFlow.customer?.contact?.lastname || null),
            facebook: userFlow?.facebook || null,
            email: userFlow?.email || null,
            // phone_no: (userFlow.contact && userFlow.contact.pre_phone_no && userFlow.contact.post_phone_no)? userFlow.contact.pre_phone_no + userFlow.contact.post_phone_no :null,
            phone_no: null,
            citizen_id: userFlow?.customer?.id_card || null,
            passport_id: null,
            address_id: null,
            address_detail: userFlow.contact? (userFlow.contact?.address || null): (userFlow.customer?.contact?.address || null),
            sex_id: null,
            occupation_id: null,
            range_income_id: null,
            date_of_brith: null,
            created_at: dateNow,
            user_id: connectUser.id
        })

        const connectOrganizations = await Staging.ConnectOrganizations.create({
            name: userFlow.contact? (userFlow.contact?.name + " - " + uuidV4() || uuidV4()) : (userFlow.customer?.contact?.name + " - " + uuidV4() || uuidV4()),
            phone_no: (userFlow.contact || userFlow.customer?.contact)? (userFlow.contact || userFlow.customer?.contact).pre_phone_no + ((userFlow.contact || userFlow.customer?.contact)).post_phone_no :null,
            business_type_id: null,
            registered_number: userFlow.customer?.tax_id || null,
            address_detail: userFlow.customer?.biling_address || null,
            address_id: null,
            created_at: dateNow
        });

        await Staging.ConnectOrganizationsUsers.create({
            organization_id: connectOrganizations.id,
            user_id: connectUser.id,
            role_id: 1,
        })

        await Staging.ConnectOrganizationPlatform.create({
            organization_id: connectOrganizations.id,
            platform: "connect"
        });


    } catch (e) {
        console.error(e)
        throw e
    }
}

const migrationUserFlowToConnectUser = async () => {
    try {

        const userIDs = await Prod.UserFlow.findAll({
            attributes: ["id"],
        }).then(r => r[0]? r.map(n => n.id): []);

        for (let i = 0; i <= userIDs.length; i++) {
            await migrationUserFlowToConnectUserByUserFlowID(userIDs[i]);
        }

    } catch(e) {
        console.error(e);
        throw e
    }
}

module.exports = {
    migrationUserFlowToConnectUserByUserFlowID,
    migrationUserFlowToConnectUser,
}