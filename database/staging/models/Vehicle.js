module.exports = (sequelize, DataTypes) => {
    const Vehicle = sequelize.define(
      'Vehicle',
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        organization_id: {
            type: DataTypes.INTEGER,
        },
        attributes: {
          type: DataTypes.STRING,
          field: "attributes",
          get() {
            try {
              const value = this.getDataValue("attributes");
              if (!value) {
                return {};
              }
              return value;
            } catch (err) {
              return {};
            }
          },
          set(value) {
            this.setDataValue("attributes", JSON.stringify(value));
          },
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
        tableName: 'vehicle',
        timestamps: false,
      }
    );
  
    Vehicle.associate = (Model) => {
    };

    return Vehicle;
  };
  