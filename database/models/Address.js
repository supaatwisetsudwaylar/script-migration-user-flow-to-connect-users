module.exports = (sequelize, DataTypes) => {
    const Address = sequelize.define(
      "Address",
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          field: "id",
        },
        tambonID: {
            field: "tambon_id",
            type: DataTypes.INTEGER,
        },
        tambonThai: {
            field: "tambon_thai",
            type: DataTypes.STRING,
        },
        tambonEng: {
            field: "tambon_eng",
            type: DataTypes.STRING,
        },
        tambonThaiShort: {
            field: "tambon_thai_short",
            type: DataTypes.STRING,
        },
        tambonEngShort: {
            field: "tambon_eng_short",
            type: DataTypes.STRING,
        },
        postcode: {
            field: "post_code",
            type: DataTypes.STRING,
        },
        districtID: {
            field: "district_id",
            type: DataTypes.INTEGER,
        },
        districtThai: {
            field: "district_thai",
            type: DataTypes.STRING,
        },
        districtEng: {
            field: "district_eng",
            type: DataTypes.STRING,
        },
        districtThaiShort: {
            field: "district_thai_short",
            type: DataTypes.STRING,
        },
        districtEngShort: {
            field: "district_eng_short",
            type: DataTypes.STRING,
        },
        provinceID: {
            field: "province_id",
            type: DataTypes.INTEGER,
        },
        provinceThai: {
            field: "province_thai",
            type: DataTypes.STRING,
        },
        provinceEng: {
            field: "province_eng",
            type: DataTypes.STRING,
        },
      },
      {
        underscored: false,
        freezeTableName: true,
        tableName: "address",
        timestamps: false,
      }
    );
    Address.associate = (Model) => {
  
    };
  
    return Address;
  };
  