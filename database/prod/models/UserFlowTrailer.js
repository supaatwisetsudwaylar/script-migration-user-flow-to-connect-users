module.exports = (sequelize, DataTypes) => {
    const UserFlowTrailer = sequelize.define(
      'UserFlowTrailer',
      {
        user_flow_id: {
          type: DataTypes.INTEGER,
        },
        trailer_id: {
          type: DataTypes.INTEGER,
        },
      },
      {
        underscored: true,
        freezeTableName: true,
        tableName: 'user_flow_trailer',
        timestamps: false,
      }
    );
  
    UserFlowTrailer.associate = (Model) => {
    };

    return UserFlowTrailer;
  };
  