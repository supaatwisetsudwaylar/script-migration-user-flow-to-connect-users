module.exports = (sequelize, DataTypes) => {
    const Trailer = sequelize.define(
      'Trailer',
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
        tableName: 'trailer',
        timestamps: false,
      }
    );
  
    Trailer.associate = (Model) => {
    };

    return Trailer;
  };
  