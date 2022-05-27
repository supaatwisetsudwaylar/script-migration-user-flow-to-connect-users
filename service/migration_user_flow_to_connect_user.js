const { sequelize } = require('../database/models');
const { models } = sequelize;
const moment = require('moment');
const MigrationUserFlowToConnectUserByUserFlowID = async (id) => {
    try {

        const dateNow = moment().unix();
        const userFlow = await models.UserFlow.findOne({
            include: [
                {
                    model: models.Customer,
                    as: "customer"
                },
                {
                    model: models.Contact,
                    as: "contact",
                    include: [
                        {
                            model: models.TitleName,
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

        const connectUser = await models.ConnectUsers.create({
            id: userFlow.id,
            username: userFlow.username,
            hashed_password: userFlow.hashed_password,
            is_active: userFlow.enable,
            max_session: userFlow.max_session == -1? 1: userFlow.max_session,
            is_verify: false,
            is_kyc: false,
            metadata: userFlow.metadata,
            created_at: dateNow,
        });

        await models.ConnectProfiles.create({
            title: userFlow?.contact?.title_name?.initials_th || null,
            first_name: userFlow?.contact?.firstname || null,
            middle_name: null,
            last_name: userFlow?.contact?.lastname || null,
            facebook: userFlow?.facebook || null,
            email: userFlow?.email || null,
            // phone_no: (userFlow.contact && userFlow.contact.pre_phone_no && userFlow.contact.post_phone_no)? userFlow.contact.pre_phone_no + userFlow.contact.post_phone_no :null,
            phone_no: null,
            citizen_id: userFlow?.customer?.id_card || null,
            passport_id: null,
            address_id: null,
            address_detail: userFlow?.contact?.address || null,
            sex_id: null,
            occupation_id: null,
            range_income_id: null,
            date_of_brith: null,
            created_at: dateNow,
            user_id: connectUser.id
        })

        const connectOrganizations = await models.ConnectOrganizations.create({
            name: userFlow?.contact?.name || "",
            phone_no: (userFlow.contact && userFlow.contact.pre_phone_no && userFlow.contact.post_phone_no)? userFlow.contact.pre_phone_no + userFlow.contact.post_phone_no :null,
            business_type_id: null,
            registered_number: userFlow?.customer?.tax_id || null,
            address_detail: userFlow?.customer?.biling_address || null,
            address_id: null,
            created_at: dateNow
        });

        await models.ConnectOrganizationsUsers.create({
            organization_id: connectOrganizations.id,
            user_id: connectUser.id,
            role_id: 1,
            platform: "CONNECT",
        })

        await models.ConnectOrganizationPlatform.create({
            organization_id: connectOrganizations.id,
            platform: "CONNECT"
        });


    } catch (e) {
        console.error(e)
    }
}

module.exports = {
    MigrationUserFlowToConnectUserByUserFlowID,
}