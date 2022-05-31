module.exports = (sequelize, DataTypes) => {
    const UserFlowHeavyEquiment = sequelize.define(
      'UserFlowHeavyEquiment',
      {
        user_flow_id: {
          type: DataTypes.INTEGER,
        },
        heavy_equipment_id: {
          type: DataTypes.INTEGER,
        },
      },
      {
        underscored: true,
        freezeTableName: true,
        tableName: 'user_flow_heavy_equipment',
        timestamps: false,
      }
    );
  
    UserFlowHeavyEquiment.associate = (Model) => {
    };

    return UserFlowHeavyEquiment;
  };
  