module.exports = (sequelize, DataTypes) => {
    const HeavyEquiment = sequelize.define(
      'HeavyEquiment',
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        organization_id: {
            type: DataTypes.INTEGER,
        },
        iot_package_id: {
          type: DataTypes.INTEGER,
        },
        mdvr_package_id: {
          type: DataTypes.INTEGER,
        },
        serial_camera: {
          type: DataTypes.STRING,
        },
      },
      {
        underscored: true,
        freezeTableName: true,
        tableName: 'heavy_equipment',
        timestamps: false,
      }
    );
  
    HeavyEquiment.associate = (Model) => {
    };

    return HeavyEquiment;
  };
  