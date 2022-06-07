module.exports = (sequelize, DataTypes) => {
    const Vehicle = sequelize.define(
      'Vehicle',
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        license_no: {
          type: DataTypes.STRING,
        },
        chassis_no: {
          type: DataTypes.STRING,
        },
        organization_id: {
            type: DataTypes.INTEGER,
        }
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
  