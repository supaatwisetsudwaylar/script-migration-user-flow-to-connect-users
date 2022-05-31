module.exports = (sequelize, DataTypes) => {
    const UserFlowVehicle = sequelize.define(
      'UserFlowVehicle',
      {
        user_flow_id: {
          type: DataTypes.INTEGER,
        },
        vehicle_id: {
          type: DataTypes.INTEGER,
        },
      },
      {
        underscored: true,
        freezeTableName: true,
        tableName: 'user_flow_vehicle',
        timestamps: false,
      }
    );
  
    UserFlowVehicle.associate = (Model) => {
    };

    return UserFlowVehicle;
  };
  