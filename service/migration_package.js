const xlsx = require("xlsx");
const {
  sequelize: { models: Prod },
} = require("../database/prod/models");
const { sequelize: sequelizeProd } = require("../database/prod/models");
const {
  sequelize: { models: Staging },
} = require("../database/staging/models");
const moment = require("moment");
const { Op } = require("sequelize");

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
            { license_no: _data.license_no || null },
            { chassis_no: _data.chassis_no || null },
          ],
        },
        transaction: t || null,
      });

      if (!vehicle) {
        if (t) t.commit();
        continue;
      }

      await Prod.Vehicle.update(
        {
          iot_package_id: _data["type"] == "AIRTIME"? 2: 1,
        },
        {
          where: {
            id: vehicle.id,
          },
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
                  price: _data[`${m}/${y}`]
                    ? parseFloat(_data[`${m}/${y}`].replace(",", ""))
                    : null,
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
