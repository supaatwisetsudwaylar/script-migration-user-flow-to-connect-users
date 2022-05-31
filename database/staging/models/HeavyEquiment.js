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
        }
      },
      {
        underscored: true,
        freezeTableName: true,
        tableName: 'heavy_equiment',
        timestamps: false,
      }
    );
  
    HeavyEquiment.associate = (Model) => {
    };

    return HeavyEquiment;
  };
  