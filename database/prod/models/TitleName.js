module.exports = (sequelize, DataTypes) => {
    const TitleName = sequelize.define(
      'TitleName',
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        initials_th: {
            type: DataTypes.STRING,
        }
      },
      {
        underscored: true,
        freezeTableName: true,
        tableName: 'title_name',
        timestamps: false,
      }
    );
  
    return TitleName;
  };
  