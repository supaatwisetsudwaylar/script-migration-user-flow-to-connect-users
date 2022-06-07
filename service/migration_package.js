const xlsx = require("xlsx");
const {
  sequelize: { models: Prod },
} = require("../database/prod/models");
const { sequelize: sequelizeProd } = require("../database/prod/models");
const {
  sequelize: { models: Staging },
} = require("../database/staging/models");
const moment = require("moment");
const { Op } = require('sequelize')

function getDataForXlsx(dir) {
  const wb = xlsx.readFile(dir, { cellDates: true });

  const sheet = wb.Sheets["object"];

  return xlsx.utils.sheet_to_json(sheet, { raw: false });
}

async function migrateDataToPackage(data = []) {
  for (let index = 0; index < data.length; index++) {
    const t = await sequelizeProd.transaction();
    try {
      let _data = data[index] || {};
      const vehicle = await Prod.Vehicle.findOne({
        where: {
          [Op.or]: [
            {license_no: _data.license_no || null },
            {chassis_no: _data.chassis_no || null }
          ]
        },
        transaction: t || null,
      });

      const packageObject = await Prod.ConnectPackageObject.findOne({
          where: {
              ref_id: vehicle?.id || null
          },
          transaction: t || null,
      })

      if (!vehicle || packageObject) {
          if (t) t.commit();
          continue;
    };

      await Prod.ConnectPackageObject.create(
        {
          organization_id: vehicle.organization_id || null,
          ref_type: "vehicle",
          ref_id: vehicle.id,
          no: vehicle.chassis_no,
          package_id: 1,
          iot_qt: _data["IoT OT"] || null,
          type: _data["type"] || null,
          contract_type: _data["contract_type"] || null,
          contract_term: +_data["contract_term"] || null,
          price: +_data["1/19"] || null,
          price: +_data['1/19']? parseFloat(_data['1/19'].replace(',', '')): null,
          agent: _data["agent"] || null,
          commission: _data["commission"]
            ? parseFloat(_data["commission"])
            : null,
          payment_start_date: _data["installation_date"]
            ? moment(
                `${moment(_data["installation_date"]).format("YYYY-MM")}-01`
              )
            : null,
        },
        {
          transaction: t || null,
        }
      );

      let invoice = [];
      for (y = 18; y <= 21; y++) {
        for (let m = 0; m <= 12; m++) {
          if (_data[`${m}/${y}`]) {
            invoice = [
              ...invoice,
              {
                ref_type: "vehicle",
                ref_id: vehicle.id,
                payment_date: moment(`${20 + y}-${m > 9 ? "0" + m : m}-01`),
                price: _data[`${m}/${y}`]? parseFloat(_data[`${m}/${y}`].replace(',', '')): null,
              },
            ];
          }
        }
      }
      if (invoice[0]) {
        await Prod.ConnectPackageInvoice.bulkCreate(invoice, {
            transaction: t || null,
        });
      }

      if (t) t.commit();
    } catch (e) {
      if (t) t.rollback();
      console.log(e);
      throw e;
    }
  }
}

module.exports = {
  getDataForXlsx,
  migrateDataToPackage,
};
